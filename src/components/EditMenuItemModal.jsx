import React, { useState } from 'react'


const EditMenuItemModal = ({ item, onSave, onCancel, onDelete }) => {
  const [name, setName] = useState(item ? item.name : '')
  const [description, setDescription] = useState(item ? item.description : '')
  const [price, setPrice] = useState(item ? item.price : '')
  const [image, setImage] = useState(item ? item.image : '')


  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const compressedImage = await resizeImage(file, 800) // Compress image to width 800px
      setImage(compressedImage)
    }
  }
  
  // Helper function to resize the image using a canvas
  function resizeImage(file, maxWidth) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()
  
      reader.onload = (event) => {
        img.src = event.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Calculate new dimensions while maintaining aspect ratio
          const scaleFactor = maxWidth / img.width
          const width = maxWidth
          const height = img.height * scaleFactor
  
          canvas.width = width
          canvas.height = height
  
          // Draw the image on the canvas with new dimensions
          ctx.drawImage(img, 0, 0, width, height)
  
          // Convert the canvas to a base64-encoded image
          const base64Image = canvas.toDataURL('image/png', 0.5) 
          resolve(base64Image)
        }
  
        img.onerror = (err) => {
          reject(err)
        }
      }
  
      reader.onerror = (err) => {
        reject(err)
      }
  
      reader.readAsDataURL(file) // Convert file to base64 so img element can load it
    })
  }
  

  const handleSave = () => {
    onSave({
      ...item,
      name,
      description,
      price,
      image
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">{item ? 'Edit Menu Item' : 'Add New Item'}</h2>
        
        <input 
          type="text" 
          className="w-full p-2 border rounded mb-4" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <textarea 
          className="w-full p-2 border rounded mb-4" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />

        <input 
          type="number" 
          className="w-full p-2 border rounded mb-4" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />

        <input 
          type="file" 
          accept="image/*" 
          className="mb-4" 
          onChange={handleFileUpload} 
        />
        
        <div className="flex justify-between">
          <button 
            onClick={handleSave} 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button 
            onClick={onCancel} 
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
        {item && (
          <div className="mt-4 flex justify-center">
            <button 
              onClick={() => onDelete(item.id)} 
              className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-800"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditMenuItemModal


function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }