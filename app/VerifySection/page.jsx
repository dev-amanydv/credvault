"use client"

import { useState, useRef } from 'react'

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

      const data = await res.json()
      setVerificationResult({
        valid: data.valid,
        message: data.message || (data.valid ? 'Certificate is valid ✅' : 'Certificate is invalid ❌'),
      })
    } catch (err) {
      console.error(err)
      setVerificationResult({ valid: false, message: 'Verification failed ❌' })
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

      const data = await res.json()
      setVerificationResult({
        valid: data.valid,
        message: data.message || (data.valid ? 'Certificate is valid ✅' : 'Certificate is invalid ❌'),
      })
    } catch (err) {
      console.error(err)
      setVerificationResult({ valid: false, message: 'Verification failed ❌' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-semibold mb-8 text-white">Certificate Verification</h2>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-300 dark:border-gray-700 mb-8">
          {['upload', 'qr'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setSelectedFile(null)
                setQrData('')
                setVerificationResult(null)
              }}
              className={`px-5 py-3 text-base font-medium transition ${
                activeTab === tab
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'upload' ? 'Upload Certificate' : 'QR Code Verification'}
            </button>
          ))}
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="border-2 border-dashed border-gray-400 rounded-lg p-16 text-center cursor-pointer bg-yellow-50 hover:bg-green-50 transition dark:bg-yellow-900 dark:hover:bg-teal-900 relative"
              onClick={openFileDialog}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="text-6xl mb-4 select-none">📄</div>
              {selectedFile ? (
                <p className="font-medium text-teal-700 dark:text-teal-400">
                  Selected File: {selectedFile.name}
                </p>
              ) : (
                <>
                  <p>Drop certificate file here or click to browse</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Supports PDF, JPG, PNG (Max 5MB)
                  </p>
                </>
              )}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-6 flex flex-col justify-center items-center min-h-[200px]">
              {!selectedFile ? (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Upload a certificate to begin verification
                </p>
              ) : (
                <p className="text-center text-teal-600 font-semibold">
                  Ready to verify {selectedFile.name}
                </p>
              )}
              {verificationResult && (
                <p
                  className={`mt-4 font-semibold ${
                    verificationResult.valid ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {verificationResult.message}
                </p>
              )}
              {selectedFile && (
                <button
                  onClick={verifyFile}
                  disabled={loading}
                  className={`mt-4 px-6 py-2 rounded-md font-semibold text-white transition ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800'
                  }`}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* QR Tab */}
        {activeTab === 'qr' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="qrInput"
                  className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-300"
                >
                  QR Code Data
                </label>
                <input
                  type="text"
                  id="qrInput"
                  placeholder="Paste QR code data or scan code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                />
              </div>
              <button
                onClick={verifyQR}
                disabled={!qrData.trim() || loading}
                className={`w-full px-4 py-2 rounded-md font-semibold text-white transition ${
                  qrData.trim() && !loading
                    ? 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Verifying...' : 'Verify QR Code'}
              </button>
              {verificationResult && (
                <p
                  className={`mt-4 font-semibold ${
                    verificationResult.valid ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {verificationResult.message}
                </p>
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-6 flex justify-center items-center">
              <img
                src="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/42ec956ef651e6b88000ffa8823c87c7/b09a357c-477e-404a-9cc5-bf5f462f2b14/40527bad.png"
                alt="Certificate Verification Workflow"
                className="mx-auto rounded-md max-w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
