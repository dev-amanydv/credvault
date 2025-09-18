import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className=' text-black dark:text-white fixed left-1/2 transform -translate-x-1/2 z-50 w-full p-2 md:p-3 lg:p-4'>
      <div className='bg-black/20 px-2 rounded-2xl border border-white/10 backdrop-blur-md max-w-4xl mx-auto'>
        <div className='flex items-center w-full justify-between'>
        <Link className="flex items-center px-2 py-0.5 pr-4 rounded-xl border border-neutral-100/0 transition-all duration-500 ease-in-out hover:shadow-xl min-w-[120px] hover:brightness-200 nofocus" title="Home" href="/home"><div className="relative h-6 w-[74px] bottom-0.5 right-2"><span className="text-lg font-medium tracking-tight absolute transition-opacity duration-500 opacity-100">CredVault</span><span className="text-lg flex font-medium tracking-tight absolute transition-opacity duration-500 opacity-0"></span></div></Link>
        <Link className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] text-glow rounded-lg nofocus" title="How CredVault works?" href="/howitworks">Need for CredVault?</Link>
        <Link className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] text-glow rounded-lg nofocus" title="How CredVault works?" href="/howitworks">How it works?</Link>
        <Link className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] text-glow rounded-lg nofocus" title="Explore CredVault Features" href="/features">Features</Link>
        <Link className="text-[13px] text-neutral-300 hover:text-white px-3 py-3 transition-all duration-500 ease-in-out text-center min-w-[80px] text-glow rounded-lg nofocus hidden md:block" title="Why it's safe?" href="/security">Security</Link>
        <div className="relative"><button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-lg transition-all duration-500 ease-in-out shine-large text-[13px] justify-center shadow-strong text-center hidden min-[480px]:block" title="Open App">Early Access</button></div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
