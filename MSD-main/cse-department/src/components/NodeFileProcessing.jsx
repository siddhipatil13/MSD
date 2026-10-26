import { useMemo, useState } from 'react'

const API_BASE = '/api/files'

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

function isGzipFile(file) {
  return Boolean(file?.name?.toLowerCase().endsWith('.gz'))
}

async function readJsonResponse(response) {
  const text = await response.text()

  if (!text.trim()) {
    throw new Error('No JSON response received. Start the backend with npm run backend, then try again.')
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('The server returned an invalid response. Make sure the backend is running on http://localhost:5000.')
  }
}

function FlowSteps({ type }) {
  const steps = type === 'decompress'
    ? ['Compressed File', 'Readable Stream', 'pipe()', 'Gunzip', 'pipe()', 'Original File']
    : ['Input File', 'Readable Stream', 'pipe()', 'Gzip Compression', 'pipe()', 'Writable Stream']

  return (
    <div className="pipe-flow" aria-label={`${type} pipe flow`}>
      {steps.map((step, index) => (
        <div className="pipe-step" key={`${type}-${step}-${index}`}>
          <span>{step}</span>
          {index < steps.length - 1 && <b>v</b>}
        </div>
      ))}
    </div>
  )
}

function ResultPanel({ result }) {
  if (!result) return null

  const savedAmount = result.compressionPercentage
  const isCompression = result.operation === 'compress'
  const downloadHref = result.downloadUrl

  return (
    <div className="file-result">
      <h3>{isCompression ? 'Compression Successful' : 'Decompression Successful'}</h3>
      <div className="result-grid">
        <p><strong>Original File</strong><span>{result.originalName}</span></p>
        <p><strong>Output File</strong><span>{result.outputName}</span></p>
        <p><strong>Original Size</strong><span>{formatBytes(result.originalSize)}</span></p>
        <p><strong>Output Size</strong><span>{formatBytes(result.outputSize)}</span></p>
        {isCompression && (
          <p>
            <strong>{savedAmount >= 0 ? 'Space Saved' : 'Size Increased'}</strong>
            <span>{Math.abs(savedAmount)}%</span>
          </p>
        )}
      </div>
      <a className="button button-primary" href={downloadHref}>
        Download {isCompression ? 'Compressed' : 'Decompressed'} File
      </a>
    </div>
  )
}

function NodeFileProcessing() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loadingAction, setLoadingAction] = useState('')

  const canCompress = useMemo(() => selectedFile && !isGzipFile(selectedFile), [selectedFile])
  const canDecompress = useMemo(() => selectedFile && isGzipFile(selectedFile), [selectedFile])

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
    setResult(null)
    setError('')
  }

  async function processFile(action) {
    if (!selectedFile) {
      setError('Please choose a file first.')
      return
    }

    setLoadingAction(action)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch(`${API_BASE}/${action}`, {
        method: 'POST',
        body: formData,
      })

      const data = await readJsonResponse(response)

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'File processing failed.')
      }

      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong while processing the file.')
    } finally {
      setLoadingAction('')
    }
  }

  return (
    <section id="web-lab" className="section node-files-section">
      <div className="section-heading centered">
        <p className="eyebrow">CSE WEB TECHNOLOGY LAB</p>
        <h2>Backend practical with <span>Node.js streams.</span></h2>
        <p>This lab activity demonstrates how CSE students handle files on a server using Express, streams, pipe, and zlib.</p>
      </div>

      <div className="file-processing-layout">
        <div className="file-tool-card">
          <label className="upload-box" htmlFor="node-file-upload">
            <span>Upload practical file</span>
            <input id="node-file-upload" type="file" onChange={handleFileChange} />
          </label>

          {selectedFile ? (
            <div className="selected-file">
              <p className="mini-label">Practical File</p>
              <h3>{selectedFile.name}</h3>
              <p>Size: {formatBytes(selectedFile.size)}</p>
              <p>Type: {selectedFile.type || 'Not specified'}</p>
            </div>
          ) : (
            <div className="selected-file muted">
              <p className="mini-label">Practical File</p>
              <h3>No file chosen</h3>
              <p>Choose a course file to compress or a .gz lab output to decompress.</p>
            </div>
          )}

          <div className="file-actions">
            <button
              className="button button-primary"
              type="button"
              disabled={!canCompress || Boolean(loadingAction)}
              onClick={() => processFile('compress')}
            >
              {loadingAction === 'compress' ? 'Compressing...' : 'Compress File'}
            </button>
            <button
              className="button button-secondary"
              type="button"
              disabled={!canDecompress || Boolean(loadingAction)}
              onClick={() => processFile('decompress')}
            >
              {loadingAction === 'decompress' ? 'Decompressing...' : 'Decompress File'}
            </button>
          </div>

          {error && <p className="form-error">{error}</p>}
          <ResultPanel result={result} />
        </div>

        <div className="concept-card">
          <div>
            <p className="mini-label">Server Compression Flow</p>
            <FlowSteps type="compress" />
          </div>
          <div>
            <p className="mini-label">Server Decompression Flow</p>
            <FlowSteps type="decompress" />
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h3>Lab Notes</h3>
        <div className="concept-grid">
          <article>
            <h4>What is a Stream?</h4>
            <p>A stream processes data in small chunks instead of loading the complete file into memory.</p>
          </article>
          <article>
            <h4>What is Pipe?</h4>
            <p>pipe() transfers data from a readable stream to the next stream or writable output.</p>
          </article>
          <article>
            <h4>What is Compression?</h4>
            <p>Compression reduces the size of a file using an algorithm such as Gzip.</p>
          </article>
          <article>
            <h4>What is Decompression?</h4>
            <p>Decompression restores compressed data back into a usable original file.</p>
          </article>
          <article>
            <h4>Why use Streams?</h4>
            <p>Streams are useful for large files because the whole file does not need to be loaded at once.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default NodeFileProcessing
