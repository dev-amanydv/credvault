"use client"

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function Navbar () {
  return (
    <nav className=' text-black dark:text-white fixed left-1/2 transform -translate-x-1/2 z-50 w-full p-2 md:p-3 lg:p-4'>
      <div className='bg-neutral-700/20 px-2 py-2 rounded-2xl border border-white/10 backdrop-blur-md max-w-4xl mx-auto'>
        <div className='flex items-center w-full justify-between'>
        <Link className="flex items-center px-2 py-0.5 pr-4 rounded-xl border border-neutral-100/0 transition-all duration-500 ease-in-out hover:shadow-xl min-w-[120px] hover:brightness-200 nofocus" title="Home" href="/"><div className="relative h-6 w-[74px] bottom-0.5 right-2"><span className="text-lg font-medium tracking-tight absolute transition-opacity duration-500 opacity-100">CredVault</span><span className="text-lg flex font-medium tracking-tight absolute transition-opacity duration-500 opacity-0"></span></div></Link>
        <div className="relative"><button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-lg transition-all duration-500 ease-in-out shine-large text-[13px] justify-center shadow-strong text-center hidden min-[480px]:block" title="Open App">Early Access</button></div>
        </div>
      </div>
    </nav>
  )
}
function FilePreview({ file }) {
  const [previewUrl, setPreviewUrl] = useState(null)

  // Generate preview URL for images
  if (file && !previewUrl) {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else if (file.type === 'application/pdf') {
      setPreviewUrl(null) // No preview for PDFs, show placeholder
    }
  }

  // Cleanup URL object when file changes or component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  if (!file) return null

  if (file.type.startsWith('image/')) {
    return (
      <img
        src={previewUrl}
        alt={file.name}
        className="max-w-full max-h-48 rounded-lg border border-neutral-700 object-contain select-none"
      />
    )
  }

  // PDF placeholder
  if (file.type === 'application/pdf') {
    return (
      <div className="flex flex-col items-center justify-center w-full max-h-48 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 select-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-neutral-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="text-neutral-400 text-sm truncate">{file.name}</p>
        <p className="text-neutral-500 text-xs mt-1 select-none">PDF Preview Not Available</p>
      </div>
    )
  }

  return null
}

export default function VerifySection() {
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedFile, setSelectedFile] = useState(null)
  const [qrData, setQrData] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const fileInputRef = useRef(null)

  // Handle file input click
  const openFileDialog = () => fileInputRef.current?.click()

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      return alert('Only PDF, JPG, or PNG files are allowed')
    }

    // Validate file size (<5MB)
    if (file.size > 5 * 1024 * 1024) {
      return alert('File size exceeds 5MB')
    }

    setSelectedFile(file)
    setVerificationResult(null)
  }

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileChange({ target: { files: [file] } })
  }

  const handleDragOver = (e) => e.preventDefault()

  // Verify uploaded file
  const verifyFile = async () => {
    if (!selectedFile) return
    setLoading(true)
    setVerificationResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const res = await fetch('/api/verify-file', {
        method: 'POST',
        body: formData,
      })

      const contentType = (res.headers.get('content-type') || '').toLowerCase()

      if (!res.ok) {
        const text = await res.text().catch(() => null)
        console.error('verifyFile non-OK response', res.status, text)
        setVerificationResult({
          valid: false,
          message: `Server error ${res.status}: ${text ? text.slice(0, 300) : 'No response body'}`,
        })
        return
      }

      if (contentType.includes('application/json')) {
        const data = await res.json()
        setVerificationResult({
          valid: !!data.valid,
          message: data.message || (data.valid ? 'Certificate is valid ✅' : 'Certificate is invalid ❌'),
        })
      } else {
        // Non-JSON response (HTML/plain text) - show useful excerpt
        const text = await res.text().catch(() => null)
        console.warn('verifyFile: unexpected content-type', contentType)
        setVerificationResult({
          valid: false,
          message: text ? `Unexpected response: ${text.slice(0, 300)}` : 'Unexpected non-JSON response from server.',
        })
      }
    } catch (err) {
      console.error('verifyFile error', err)
      setVerificationResult({ valid: false, message: 'Verification failed ❌ (network or parse error)' })
    } finally {
      setLoading(false)
    }
  }

  // Verify QR code
  const verifyQR = async () => {
    if (!qrData.trim()) return alert('Please enter QR code data')
    setLoading(true)
    setVerificationResult(null)

    try {
      const res = await fetch('/api/verify-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrData }),
      })

      const contentType = (res.headers.get('content-type') || '').toLowerCase()

      if (!res.ok) {
        const text = await res.text().catch(() => null)
        console.error('verifyQR non-OK response', res.status, text)
        setVerificationResult({
          valid: false,
          message: `Server error ${res.status}: ${text ? text.slice(0, 300) : 'No response body'}`,
        })
        return
      }

      if (contentType.includes('application/json')) {
        const data = await res.json()
        setVerificationResult({
          valid: !!data.valid,
          message: data.message || (data.valid ? 'Certificate is valid ✅' : 'Certificate is invalid ❌'),
        })
      } else {
        const text = await res.text().catch(() => null)
        console.warn('verifyQR: unexpected content-type', contentType)
        setVerificationResult({
          valid: false,
          message: text ? `Unexpected response: ${text.slice(0, 300)}` : 'Unexpected non-JSON response from server.',
        })
      }
    } catch (err) {
      console.error('verifyQR error', err)
      setVerificationResult({ valid: false, message: 'Verification failed ❌ (network or parse error)' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-neutral-900 text-neutral-100 py-40">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-semibold mb-8 select-none">Certificate Verification</h2>

          {/* Tabs */}
          <div className="flex gap-3 mb-10">
            {['upload', 'qr'].map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setSelectedFile(null)
                    setQrData('')
                    setVerificationResult(null)
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none select-none border border-neutral-700 ${
                    isActive
                      ? 'bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-700 text-neutral-100 shadow-lg'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                  }`}
                >
                  {tab === 'upload' ? 'Upload Certificate' : 'QR Code Verification'}
                </button>
              )
            })}
          </div>

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-800/40 p-12 cursor-pointer hover:shadow-lg transition-shadow backdrop-blur-md relative"
                onClick={openFileDialog}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                aria-label="File upload drag and drop area"
              >
                {!selectedFile ? (
                  <>
                    <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-neutral-600 bg-opacity-80 text-white text-5xl select-none">
                      📄
                    </div>
                    <p className="text-center text-neutral-300 font-medium select-none">
                      Drop certificate file here or click to browse
                    </p>
                    <p className="text-sm text-neutral-400 mt-2 select-none">
                      Supports PDF, JPG, PNG (Max 5MB)
                    </p>
                  </>
                ) : (
                  <FilePreview file={selectedFile} />
                )}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col justify-center items-center rounded-xl border border-neutral-700 bg-neutral-800/40 p-8 shadow-md backdrop-blur-md min-h-[200px]">
                {!selectedFile ? (
                  <p className="text-center text-neutral-400 select-none">Upload a certificate to begin verification</p>
                ) : (
                  <p className="text-center text-neutral-300 font-semibold select-text break-words">
                    Ready to verify <span>{selectedFile.name}</span>
                  </p>
                )}
                {verificationResult && (
                  <p
                    className={`mt-5 font-semibold select-text ${
                      verificationResult.valid ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {verificationResult.message}
                  </p>
                )}
                {selectedFile && (
                  <button
                    onClick={verifyFile}
                    disabled={loading}
                    className={`mt-8 px-8 py-3 rounded-full font-semibold text-neutral-900 flex items-center gap-2 justify-center transition-all duration-300 focus:outline-none select-none ${
                      loading
                        ? 'border-[1px] border-neutral-700 relative rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 text-white font-medium text-sm select-none shadow-md hover:from-neutral-700 hover:via-neutral-600 hover:to-neutral-700 transition'
                        : 'border-[1px] border-neutral-700 relative rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 text-white font-medium text-sm select-none shadow-md hover:from-neutral-700 hover:via-neutral-600 hover:to-neutral-700 transition'
                    }`}
                  >
                    <Upload className="w-5 h-5" />
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* QR Tab */}
          {activeTab === 'qr' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6 rounded-xl border border-neutral-700 bg-neutral-800/40 p-8 shadow-md backdrop-blur-md">
                <div>
                  <label
                    htmlFor="qrInput"
                    className="block mb-2 font-medium text-neutral-300 select-none"
                  >
                    QR Code Data
                  </label>
                  <input
                    type="text"
                    id="qrInput"
                    placeholder="Paste QR code data or scan code"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                  />
                </div>
                <button
                  onClick={verifyQR}
                  disabled={!qrData.trim() || loading}
                  className={`w-full px-6 py-3 rounded-full font-semibold text-neutral-900 transition-all duration-300 focus:outline-none select-none ${
                    qrData.trim() && !loading
                      ? 'bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-700 hover:brightness-110 active:brightness-90 shadow-lg'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Verifying...' : 'Verify QR Code'}
                </button>
                {verificationResult && (
                  <p
                    className={`mt-5 font-semibold select-text ${
                      verificationResult.valid ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {verificationResult.message}
                  </p>
                )}
              </div>
              <div className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-6 shadow-md backdrop-blur-md flex justify-center items-center">
                <img
                  src="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/42ec956ef651e6b88000ffa8823c87c7/b09a357c-477e-404a-9cc5-bf5f462f2b14/40527bad.png"
                  alt="Certificate Verification Workflow"
                  className="mx-auto rounded-lg max-w-full h-auto select-none"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
