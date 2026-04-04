import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const app = express()
const PORT = parseInt(process.env.REMOTE_SEARCH_PORT)

app.use(cors())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' })
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.warn(`Server is running at http://localhost:${PORT}`)
  console.warn(
    `RemoteEntry.js is accessible at http://localhost:${PORT}/remoteEntry.js`
  )
})
