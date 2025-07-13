import React from 'react'

const Loading = ({ message = "Carregando..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 bg-amber-600 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-2 bg-amber-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
        <p className="text-amber-800 font-medium animate-pulse">{message}</p>
      </div>
    </div>
  )
}

export default Loading 