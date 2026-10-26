import crypto from 'crypto'
import express from 'express'
import multer from 'multer'
import path from 'path'
import {
  compressFile,
  decompressFile,
  downloadFile,
  ensureStorageDirs,
  uploadDir,
} from '../controllers/fileController.js'

ensureStorageDirs()

const router = express.Router()

function cleanUploadName(originalName) {
  const extension = path.extname(originalName).replace(/[^a-zA-Z0-9.]/g, '')
  return `${Date.now()}-${crypto.randomUUID()}${extension}`
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    callback(null, cleanUploadName(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

router.post('/compress', upload.single('file'), compressFile)
router.post('/decompress', upload.single('file'), decompressFile)
router.get('/download/:fileName', downloadFile)

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: error.code === 'LIMIT_FILE_SIZE'
        ? 'File is too large. Please upload a file under 10 MB.'
        : error.message,
    })
  }

  return next(error)
})

export default router
