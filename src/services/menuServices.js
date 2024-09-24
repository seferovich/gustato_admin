import axios from "axios"


const updateMenu = async (items) => {
    try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('authToken')

        // Make a request with the token included in the Authorization header
        const response = await axios.post('http://localhost:9000/api/menu/update', items, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        
    } catch (error) {
        console.error('Request failed:', error)
        throw error
    }
}

const getMenu = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/menu/getMenu')
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
}

export const menuServices = {
    updateMenu,
    getMenu
}


