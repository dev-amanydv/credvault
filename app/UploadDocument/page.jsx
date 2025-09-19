'use client'

import { useCallback, useState, useRef } from 'react'

export default function DragDropUpload({ onFile }) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileValidation(e.dataTransfer.files[0])
      }
    },
    []
  )

  const handleFileValidation = (selectedFile) => {
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(selectedFile.type)) {
      alert('Only PDF, JPG, or PNG files are allowed.')
      return
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB.')
      return
    }

    setFile(selectedFile)
    onFile(selectedFile)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidation(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    onFile(null)
  }

  const openFileDialog = () => fileInputRef.current?.click()

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-800 p-4">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`border-4 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragging ? 'border-teal-500 bg-teal-50 dark:bg-teal-900' : 'border-gray-300 bg-white dark:bg-gray-800'
        } shadow-sm hover:shadow-lg max-w-md w-full`}
      >
        {!file ? (
          <>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Drag & drop a certificate here</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">or</p>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-teal-600 hover:text-teal-800 underline font-semibold"
            >
              Browse files
            </label>
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Max size: 5MB</p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Make sure your certificate is clear and readable for successful verification.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                alert('Help: Only PDF/JPG/PNG under 5MB allowed.')
              }}
              className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium text-sm transition"
            >
              Help
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {file.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-32 h-32 object-contain rounded-md border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md border">
                <span className="text-gray-600 dark:text-gray-300 font-semibold">PDF</span>
              </div>
            )}
            <p className="text-teal-700 dark:text-teal-400 font-medium">{file.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium text-sm transition"
              >
                Remove
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  alert(`File ready to be uploaded: ${file.name}`)
                }}
                className="px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium text-sm transition"
              >
                Confirm Upload
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              Click “Confirm Upload” to send the certificate for verification.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
