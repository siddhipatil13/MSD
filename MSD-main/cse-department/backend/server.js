import express from 'express'
import fileRoutes from './routes/fileRoutes.js'
import { ensureStorageDirs } from './controllers/fileController.js'

const app = express()
const PORT = process.env.PORT || 5000

ensureStorageDirs()

app.use(express.json())
app.use('/api/files', fileRoutes)

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Node.js file processing API is running.' })
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ success: false, message: 'Server error. Please try again.' })
})

app.listen(PORT, () => {
  console.log(`File processing server running on http://localhost:${PORT}`)
})
