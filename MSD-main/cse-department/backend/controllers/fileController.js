import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import zlib from 'zlib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const backendRoot = path.join(__dirname, '..')

export const uploadDir = path.join(backendRoot, 'uploads')
export const compressedDir = path.join(backendRoot, 'compressed')

export function ensureStorageDirs() {
  fs.mkdirSync(uploadDir, { recursive: true })
  fs.mkdirSync(compressedDir, { recursive: true })
}

function safeName(fileName) {
  const parsed = path.parse(path.basename(fileName))
  const cleanBase = parsed.name.replace(/[^a-zA-Z0-9.-]/g, '_') || 'file'
  const cleanExt = parsed.ext.replace(/[^a-zA-Z0-9.]/g, '')
  return `${cleanBase}${cleanExt}`
}

function removeGzipExtension(fileName) {
  return fileName.toLowerCase().endsWith('.gz') ? fileName.slice(0, -3) : `${fileName}.decompressed`
}

function createOutputName(originalName, operation) {
  const safeOriginal = safeName(originalName)
  const id = crypto.randomUUID()

  if (operation === 'compress') {
    return `${id}-${safeOriginal}.gz`
  }

  return `${id}-${removeGzipExtension(safeOriginal)}`
}

function pipeWithStreams(inputPath, outputPath, transformStream) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(inputPath)
    const writeStream = fs.createWriteStream(outputPath)

    readStream.on('error', reject)
    transformStream.on('error', reject)
    writeStream.on('error', reject)
    writeStream.on('finish', resolve)

    readStream.pipe(transformStream).pipe(writeStream)
  })
}

async function deleteFile(filePath) {
  try {
    await fs.promises.unlink(filePath)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Could not delete ${filePath}:`, error.message)
    }
  }
}

async function buildResponse(req, res, outputPath, outputName, operation) {
  const originalStats = await fs.promises.stat(req.file.path)
  const outputStats = await fs.promises.stat(outputPath)
  const compressionPercentage = originalStats.size === 0
    ? 0
    : Number((((originalStats.size - outputStats.size) / originalStats.size) * 100).toFixed(2))

  return res.json({
    success: true,
    operation,
    originalName: req.file.originalname,
    originalSize: originalStats.size,
    outputName,
    outputSize: outputStats.size,
    compressedFileName: operation === 'compress' ? outputName : undefined,
    compressedSize: operation === 'compress' ? outputStats.size : undefined,
    compressionPercentage,
    downloadUrl: `/api/files/download/${outputName}`,
  })
}

export async function compressFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a file.' })
  }

  if (req.file.originalname.toLowerCase().endsWith('.gz')) {
    await deleteFile(req.file.path)
    return res.status(400).json({ success: false, message: 'A .gz file should be decompressed, not compressed again.' })
  }

  const outputName = createOutputName(req.file.originalname, 'compress')
  const outputPath = path.join(compressedDir, outputName)
  const gzip = zlib.createGzip()

  try {
    await pipeWithStreams(req.file.path, outputPath, gzip)
    await buildResponse(req, res, outputPath, outputName, 'compress')
  } catch (error) {
    await deleteFile(outputPath)
    res.status(500).json({ success: false, message: 'Compression failed. Please try a valid file.' })
  } finally {
    await deleteFile(req.file.path)
  }
}

export async function decompressFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a .gz file.' })
  }

  if (!req.file.originalname.toLowerCase().endsWith('.gz')) {
    await deleteFile(req.file.path)
    return res.status(400).json({ success: false, message: 'Only .gz files can be decompressed here.' })
  }

  const outputName = createOutputName(req.file.originalname, 'decompress')
  const outputPath = path.join(compressedDir, outputName)
  const gunzip = zlib.createGunzip()

  try {
    await pipeWithStreams(req.file.path, outputPath, gunzip)
    await buildResponse(req, res, outputPath, outputName, 'decompress')
  } catch (error) {
    await deleteFile(outputPath)
    res.status(400).json({ success: false, message: 'Decompression failed. Please upload a valid .gz file.' })
  } finally {
    await deleteFile(req.file.path)
  }
}

export async function downloadFile(req, res) {
  const fileName = path.basename(req.params.fileName)
  const filePath = path.join(compressedDir, fileName)

  if (!filePath.startsWith(compressedDir)) {
    return res.status(400).json({ success: false, message: 'Invalid file path.' })
  }

  try {
    await fs.promises.access(filePath, fs.constants.R_OK)
    res.download(filePath, fileName)
  } catch (error) {
    res.status(404).json({ success: false, message: 'File not found.' })
  }
}
