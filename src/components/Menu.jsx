import React, { useState, useEffect } from 'react'
import MenuItemCard from './MenuItemCard'
import EditMenuItemModal from './EditMenuItemModal'
import { menuServices } from '../services/menuServices'
import { ImSpinner2 } from "react-icons/im"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Menu = ({ menu }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken')
  if(!token){
    navigate("/")
  }
  const [sections, setSections] = useState({
    burgers: [],
    sides: [],
    drinks: [],
  })

  const [currentItem, setCurrentItem] = useState(null)
  const [currentSection, setCurrentSection] = useState(null)
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true) 
        const data = await menuServices.getMenu() 

        const formattedSections = {
          burgers: data.burgers || [],
          sides: data.sides || [],
          drinks: data.drinks || [],
        }
        setSections(formattedSections)
      } catch (error) {
        console.error('Error fetching menu:', error)
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }
    
    fetchMenu()
  }, [menu])

  const handleEdit = (section, item) => {
    setCurrentItem(item)
    setCurrentSection(section)
  }

  const handleSave = (item) => {
    if (item._id) {
      setSections({
        ...sections,
        [currentSection]: sections[currentSection].map(i => i._id === item._id ? item : i)
      })
    } else {
      setSections({
        ...sections,
        [currentSection]: [...sections[currentSection], { ...item, _id: Date.now() }] // Simulate _id for new items
      })
    }
    setCurrentItem(null)
  }

  const handleDelete = (_id) => {
    setSections({
      ...sections,
      [currentSection]: sections[currentSection].filter(item => item._id !== _id)
    })
    setCurrentItem(null)
  }

  const handleCancel = () => {
    setCurrentItem(null)
  }

  const handleSaveAll = () => {
    console.log('Save all menu items:', sections)
    const itemsToSend = Object.keys(sections).reduce((acc, section) => {
      const sectionItems = sections[section].map(({ _id, ...rest }) => rest) // Exclude _id for new items
      return { ...acc, [section]: sectionItems }
    }, {})
    
    try{
      const res = menuServices.updateMenu(itemsToSend)
      if(res){
        toast.success("Menu updated!")
      }
      
    }catch(e){
      toast.error("Error!")
    }
    
  }

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center justify-center h-screen">
          <ImSpinner2 className="text-4xl animate-spin text-gray-500" />

          </div> 
        </div>
      ) : (
        <>
          {Object.keys(sections).map(section => (
            <div key={section} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sections[section].map(item => (
                  <MenuItemCard key={item._id} item={item} onEdit={() => handleEdit(section, item)} />
                ))}
                <div 
                  className="border p-4 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setCurrentItem({})
                    setCurrentSection(section)
                  }}
                >
                  <span className="text-2xl font-bold text-[#ffc703]">+ Add More</span>
                </div>
              </div>
            </div>
          ))}

          {currentItem && 
            <EditMenuItemModal 
              item={currentItem} 
              onSave={handleSave} 
              onCancel={handleCancel} 
              onDelete={() => handleDelete(currentItem._id)}
            />
          }

          <div className="flex justify-center mt-10">
            <button 
              onClick={handleSaveAll} 
              className="bg-[#ffc703] text-white py-2 px-6 w-48 rounded-full text-xl hover:bg-[#8e7930]"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Menu
