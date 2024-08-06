import React from 'react'

const SearchBar = () => {
  return (
    <div className="my-4">
      <input 
        type="text" 
        className="w-full p-2 border border-gray-400 rounded" 
        placeholder="Procure um prato ou restaurante..." 
      />
    </div>
  )
}

export default SearchBar
