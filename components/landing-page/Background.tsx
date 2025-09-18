import React from 'react'

const Background = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full pointer-events-none z-0' style={{opacity: 1}}>
         <svg
      width="1223"
      height="1223"
      viewBox="0 0 1223 1223"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-32 left-1/2 transform -translate-x-1/2 w-full h-full object-cover z-0 scale-100"
      style={{
        opacity: 1,
        animation: "fadeIn 5s linear 0.5s 1 normal forwards running",
      }}
    >
      <g opacity="0.3" className="animate-spin-slow origin-center">
        <circle
          cx="615.288"
          cy="610.797"
          r="475.451"
          transform="rotate(14.5 615.288 610.797)"
          stroke="url(#paint0_radial_0_1)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="120 120"
        />
      </g>

      <g opacity="0.6" className="animate-spin-medium origin-center">
        <circle
          cx="611.739"
          cy="611.357"
          r="432.922"
          transform="rotate(110 611.739 611.357)"
          stroke="url(#paint1_radial_0_1)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="120 120"
        />
      </g>

      <g opacity="0.3" className="animate-spin-slow origin-center">
        <circle
          cx="611.739"
          cy="611.357"
          r="610.434"
          transform="rotate(110 611.739 611.357)"
          stroke="url(#paint2_radial_0_1)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="120 120"
        />
      </g>

      <defs>
        <radialGradient
          id="paint0_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(852.891 261.878) rotate(142.947) scale(1032.29 1327.48)"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.0712291" stopColor="white" stopOpacity="0.333333" />
          <stop offset="0.213687" stopColor="white" />
          <stop offset="0.559457" stopColor="white" />
          <stop offset="0.560842" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.674355" stopColor="white" />
          <stop offset="0.675308" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.797571" stopColor="white" />
          <stop offset="0.799292" stopColor="white" stopOpacity="0" />
          <stop offset="0.909727" stopColor="white" stopOpacity="0.550228" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <radialGradient
          id="paint1_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(828.089 293.649) rotate(142.947) scale(939.951 1208.73)"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.0712291" stopColor="white" stopOpacity="0.333333" />
          <stop offset="0.213687" stopColor="white" />
          <stop offset="0.559457" stopColor="white" />
          <stop offset="0.560842" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.674355" stopColor="white" />
          <stop offset="0.675308" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.797571" stopColor="white" />
          <stop offset="0.799292" stopColor="white" stopOpacity="0" />
          <stop offset="0.909727" stopColor="white" stopOpacity="0.550228" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <radialGradient
          id="paint2_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(916.8 163.378) rotate(142.947) scale(1325.36 1704.36)"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.0712291" stopColor="white" stopOpacity="0.333333" />
          <stop offset="0.213687" stopColor="white" />
          <stop offset="0.559457" stopColor="white" />
          <stop offset="0.560842" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.674355" stopColor="white" />
          <stop offset="0.675308" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.797571" stopColor="white" />
          <stop offset="0.799292" stopColor="white" stopOpacity="0" />
          <stop offset="0.909727" stopColor="white" stopOpacity="0.550228" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>

    </div>
    
  )
}

export default Background
