import React from 'react'

const Features = () => {
  return (
    <section className='py-1 sm:py-5 md:py-10 lg:py-20 bg-gradient-to-b from-neutral-950 to-neutral-900'>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='mt-20 flex flex-col justify-center items-center gap-8 animate-fade-in-up animation-delay-200'>
            <div className='grid grid-cols-1 sm:grid-cols-2 justify-between items-center'>
            <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-medium">An AI-First Video Editor currently in development.</div>
            </div>
            <hr className='w-full border-0 h-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-2'/>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'></div>
            <div className='w-full max-w-3xl mx-auto'></div>
        </div>
      </div>
    </section>
  )
}

export default Features
