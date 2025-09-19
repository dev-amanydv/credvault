'use client'

import { Upload } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState, useRef } from 'react';

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

// NOTE: onFile now defaults to a no-op function so calling it is safe
export default function DragDropUpload({ onFile = () => {} }) {
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
    // safe call in case parent didn't pass a handler
    onFile?.(selectedFile)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidation(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    // safe call
    onFile?.(null)
  }

  const openFileDialog = () => fileInputRef.current?.click()

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-gray-100 flex flex-col">
      <Navbar />
      <hr className="w-full border-0 h-[1px] bg-gradient-to-r from-white/10 via-white/20 to-white/30 mb-2" />
      <div className="flex-grow flex justify-center items-center p-6">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={`max-w-md w-full rounded-xl border border-neutral-400/20 bg-neutral-600/20 backdrop-blur-sm shadow-lg transition-all duration-300 cursor-pointer ${
            dragging ? 'shadow-white/50 border-neutral-400/20 bg-neutral-900/30' : 'hover:shadow-neutral-600/70 hover:border-neutral-400/20'
          } p-8 flex flex-col items-center`}
        >
          {!file ? (
            <>
            <div className='flex flex-col items-center border-3 border-neutral-600/80 px-10 mb-5 hover:bg-neutral-600/20 transition-all duration-300 ease-in-out rounded-3xl border-dashed '>
            <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full text-teal-200 text-5xl select-none drop-shadow-lg">
                📄
              </div>
              <p className="text-neutral-300 font-semibold text-xl mb-1 text-center">
                Drag & drop a certificate here
              </p>
              <p className="text-neutral-300 mb-6 text-center">
                or
              </p>
              <label
                htmlFor="file-upload"
                className="mb-4 cursor-pointer font-semibold text-lg text-neutral-300 bg-clip-text select-none"
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

            </div>
              
              <p className="text-sm text-neutral-400 mb-4 select-none">Max size: 5MB</p>
              <p className="text-neutral-400 text-center select-none">
                Make sure your certificate is clear and readable for successful verification.
              </p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openFileDialog()
                }}
                className="mt-6 flex gap-2 px-6 py-2 border-[1px] border-neutral-700 relative rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 text-white font-medium text-sm select-none shadow-md hover:from-neutral-700 hover:via-neutral-600 hover:to-neutral-700 transition"
              >
                <Upload size={20} />
                Upload
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              {file.type.startsWith('image/') ? (
                <div className="w-full rounded-xl shadow-lg border border-teal-600 overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-48 object-contain bg-black"
                  />
                </div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-teal-800 rounded-xl border border-teal-600 shadow-lg">
                  <span className="text-teal-300 font-semibold text-4xl select-none">PDF</span>
                </div>
              )}
              <p className="text-teal-200 font-semibold truncate w-full text-center select-none">{file.name}</p>
              <p className="text-sm text-teal-400 select-none">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="flex gap-4 mt-2 w-full justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-medium text-sm shadow-md hover:from-red-700 hover:via-red-600 hover:to-red-700 transition select-none"
                >
                  Remove
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    alert(`File ready to be uploaded: ${file.name}`)
                  }}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 text-white font-medium text-sm shadow-md hover:from-teal-700 hover:via-teal-600 hover:to-teal-700 transition select-none"
                >
                  Confirm Upload
                </button>
              </div>
              <p className="text-teal-400 mt-3 text-sm text-center select-none">
                Click “Confirm Upload” to send the certificate for verification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}