#!/usr/bin/env node
/**
 * Playwright Codegen launcher
 * Starts all 4 MF app servers, waits for readiness, then opens Codegen
 * on the host URL so you can record actions and identify selectors.
 */

import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import { ReadStream, WriteStream } from 'node:tty'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const e2eRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(e2eRoot, '../..')

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'
const pollInterval = Number(process.env.E2E_POLL_INTERVAL ?? 1_000)
const serviceTimeout = Number(process.env.E2E_SERVICE_BOOT_TIMEOUT ?? 120_000)

// ---------------------------------------------------------------------------
// macOS EIO stream patches
// ---------------------------------------------------------------------------

const originalReadEmit = ReadStream.prototype.emit
ReadStream.prototype.emit = function patchedReadEmit(event, ...args) {
  if (event === 'error' && args[0]?.code === 'EIO') return false
  return originalReadEmit.call(this, event, ...args)
}

const originalWriteEmit = WriteStream.prototype.emit
WriteStream.prototype.emit = function patchedWriteEmit(event, ...args) {
  if (event === 'error' && args[0]?.code === 'EIO') return false
  return originalWriteEmit.call(this, event, ...args)
}

for (const stream of [process.stdin, process.stdout, process.stderr]) {
  stream?.on?.('error', (error) => {
    if (error?.code !== 'EIO') console.error('Stream error', error)
  })
}

try { process.stdin?.pause?.(); process.stdin?.unref?.() } catch {}

process.on('uncaughtException', (error) => {
  if (error?.code === 'EIO') return
  console.error('Uncaught exception:', error)
  process.exitCode = 1
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
  process.exitCode = 1
})

// ---------------------------------------------------------------------------
// Service definitions
// ---------------------------------------------------------------------------

const localRemoteEnv = {
  VITE_HOME_URL: 'http://localhost:3001',
  VITE_MEDIA_URL: 'http://localhost:3002',
  VITE_PHOTOS_URL: 'http://localhost:3003',
  VITE_SEARCH_URL: 'http://localhost:3004',
}

const services = [
  { name: 'host',   filter: '@vite-mf-monorepo/host',   port: 3000, env: localRemoteEnv },
  { name: 'home',   filter: '@vite-mf-monorepo/home',   port: 3001 },
  { name: 'media',  filter: '@vite-mf-monorepo/media',  port: 3002 },
  { name: 'photos', filter: '@vite-mf-monorepo/photos', port: 3003 },
  { name: 'search', filter: '@vite-mf-monorepo/search', port: 3004 },
].map((s) => ({
  ...s,
  command: ['pnpm', '--filter', s.filter, 'prod:server'],
  cwd: repoRoot,
  url: `http://localhost:${s.port}`,
}))

// ---------------------------------------------------------------------------
// Process management
// ---------------------------------------------------------------------------

const childProcesses = new Set()
let shuttingDown = false

const handleShutdown = async (code = 1) => {
  if (shuttingDown) return
  shuttingDown = true
  await stopAllChildren()
  process.exitCode = code
}

process.on('SIGINT', () => handleShutdown(0))
process.on('SIGTERM', () => handleShutdown(0))

async function stopAllChildren() {
  const processes = Array.from(childProcesses)
  console.log(`\nStopping ${processes.length} process(es)...`)
  await Promise.all(processes.map(gracefullyStopChild))
  await new Promise((resolve) => setTimeout(resolve, 300))
}

function gracefullyStopChild(child) {
  return new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) {
      resolve()
      return
    }
    const cleanup = () => { child.off('exit', cleanup); resolve() }
    try {
      child.once('exit', cleanup)
      process.kill(-child.pid, 'SIGKILL')
      setTimeout(cleanup, 100)
    } catch { resolve() }
  })
}

// ---------------------------------------------------------------------------
// Port cleanup
// ---------------------------------------------------------------------------

async function killPortsIfNeeded() {
  const { execSync } = await import('node:child_process')
  const ports = services.map((s) => s.port)

  for (const port of ports) {
    try {
      const pid = execSync(`lsof -ti:${port}`, { encoding: 'utf-8', stdio: 'pipe' }).trim()
      if (pid) {
        console.log(`Freeing port ${port} (PID: ${pid})`)
        execSync(`kill -9 ${pid}`, { stdio: 'ignore' })
        await sleep(500)
        try {
          execSync(`lsof -ti:${port}`, { encoding: 'utf-8', stdio: 'pipe' })
          console.warn(`Port ${port} still in use after kill`)
        } catch {
          console.log(`Port ${port} freed`)
        }
      }
    } catch {
      // Port already free
    }
  }
}

// ---------------------------------------------------------------------------
// Playwright browser install
// ---------------------------------------------------------------------------

async function ensurePlaywrightBrowsers() {
  if (process.env.E2E_SKIP_BROWSER_INSTALL === 'true') return

  console.log('Checking Playwright browsers...')

  await new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['--filter', '@vite-mf-monorepo/e2e', 'test:install-browsers'], {
      cwd: repoRoot,
      env: process.env,
      stdio: 'inherit',
    })
    childProcesses.add(child)
    child.on('exit', (code) => {
      childProcesses.delete(child)
      code === 0 ? resolve() : reject(new Error(`Playwright browser install failed (code: ${code})`))
    })
  })
}

// ---------------------------------------------------------------------------
// Service lifecycle
// ---------------------------------------------------------------------------

function startService({ name, command, cwd, env: extraEnv }) {
  const child = spawn(command[0], command.slice(1), {
    cwd,
    env: { ...process.env, ...extraEnv },
    stdio: ['ignore', 'inherit', 'inherit'],
    detached: true,
  })

  childProcesses.add(child)

  child.on('exit', (code, signal) => {
    childProcesses.delete(child)
    if (!shuttingDown && code !== 0) {
      console.error(`Service ${name} exited unexpectedly (code: ${code ?? signal})`)
      void handleShutdown(code ?? 1)
    }
  })

  return child
}

async function waitForService(service) {
  const deadline = Date.now() + serviceTimeout
  let lastError = null

  console.log(`Waiting for ${service.name} on ${service.url}...`)

  while (Date.now() < deadline) {
    try {
      const response = await fetch(service.url, { method: 'HEAD' })
      if (response.status < 500) {
        console.log(`${service.name} ready on ${service.url}`)
        return
      }
      lastError = `Status ${response.status}`
    } catch (error) {
      lastError = error.message
    }
    await sleep(pollInterval)
  }

  console.error(`${service.name} timed out after ${serviceTimeout}ms`)
  console.error(`  Last error: ${lastError}`)
  throw new Error(`Service ${service.name} not responding on ${service.url}`)
}

// ---------------------------------------------------------------------------
// Codegen runner
// ---------------------------------------------------------------------------

function runCodegen() {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['playwright', 'codegen', BASE_URL], {
      cwd: e2eRoot,
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env },
    })

    childProcesses.add(child)
    child.on('exit', (code) => {
      childProcesses.delete(child)
      code === 0 ? resolve(0) : reject(new Error(`Codegen failed (code: ${code})`))
    })
  })
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  await killPortsIfNeeded()
  await ensurePlaywrightBrowsers()

  console.log('\nStarting all services...\n')
  services.forEach((service) => startService(service))

  await Promise.all(services.map((service) => waitForService(service)))
  console.log('\nAll services ready\n')
  console.log('Opening Playwright Codegen...')
  console.log('Use Codegen to identify selectors, then create your Cucumber steps manually.\n')

  await runCodegen()
}

;(async () => {
  try {
    await main()
    await handleShutdown(0)
    process.exit(0)
  } catch (error) {
    console.error(error)
    await handleShutdown(1)
    process.exit(1)
  }
})()
