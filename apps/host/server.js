import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const app = express()
const PORT = parseInt(process.env.HOST_PORT)

app.use(cors())

// ---------------------------------------------------------------------------
// Reverse proxy for mobile testing (iOS Safari workaround)
// ---------------------------------------------------------------------------
// WHY: iOS Safari blocks cross-port dynamic import() on LAN IPs. When the
// host on :3000 tries to import("http://192.168.x.x:3001/remoteEntry.js"),
// Safari fails with "Could not connect to the server" even though the URL
// is reachable via fetch() or direct navigation. Desktop browsers don't
// have this limitation.
//
// HOW: Instead of cross-port imports, the production build bakes remote URLs
// as http://{LAN_IP}:3000/_remote/{app}/remoteEntry.js (same origin).
// This Express middleware intercepts those requests and proxies them to the
// actual remote server running on localhost:{port}. The browser sees a
// single-origin response — no cross-port issues.
//
// WHEN: Only active when DEV_MOBILE=true, set by scripts/dev-mobile.sh.
// Normal dev (pnpm dev) and CI/CD are completely unaffected.
// ---------------------------------------------------------------------------
if (process.env.DEV_MOBILE === 'true') {
  // Map remote app names to their local Express server ports (from .env)
  const remotePortMap = {
    home: process.env.REMOTE_HOME_PORT,     // 3001
    media: process.env.REMOTE_MOVIE_PORT,   // 3002
    photos: process.env.REMOTE_PHOTOS_PORT, // 3003
    search: process.env.REMOTE_SEARCH_PORT, // 3004
  }

  // Catch all requests to /_remote/:app/* (e.g. /_remote/home/remoteEntry.js)
  // :app is the remote name, req.url is the rest of the path (e.g. /remoteEntry.js)
  app.use('/_remote/:app', async (req, res) => {
    // Look up the port for the requested remote
    const port = remotePortMap[req.params.app]
    if (!port) {
      res.status(404).send('Unknown remote')
      return
    }

    // Build the target URL on localhost (e.g. http://localhost:3001/remoteEntry.js)
    // req.url includes the path after /_remote/:app, including query strings
    const targetUrl = `http://localhost:${port}${req.url}`

    try {
      // Fetch the resource from the actual remote server
      const response = await fetch(targetUrl)

      // Forward the status code (200, 304, 404, etc.)
      res.status(response.status)

      // Forward all response headers (content-type, cache-control, etc.)
      // Skip transfer-encoding because Express handles chunking itself —
      // forwarding it would corrupt the response
      response.headers.forEach((value, key) => {
        if (key !== 'transfer-encoding') res.setHeader(key, value)
      })

      // Read the full response body as a binary buffer and send it.
      // Using arrayBuffer() instead of text() to handle both JS and
      // binary assets (source maps, wasm, etc.) correctly
      const buffer = Buffer.from(await response.arrayBuffer())
      res.send(buffer)
    } catch (err) {
      // The remote server is not running or not reachable
      console.error(`Proxy error: ${targetUrl}`, err.message)
      res.status(502).send('Remote unavailable')
    }
  })

  console.warn('[host] Mobile proxy enabled: /_remote/{home,media,photos,search}')
}

app.use(express.static(path.join(__dirname, 'dist')))

// SPA fallback — all routes serve index.html so React Router handles them
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.warn(`Server is running at http://localhost:${PORT}`)
  console.warn(
    `RemoteEntry.js is accessible at http://localhost:${PORT}/remoteEntry.js`
  )
})
