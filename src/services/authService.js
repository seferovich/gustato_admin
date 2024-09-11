import axios from 'axios'

// Function to log in and store the token
const loginAndStoreToken = async (username, password) => {
  try {
    // Make a POST request to log in
    const response = await axios.post('http://localhost:9000/api/admin/login', {
      username,
      password
    })

    // Extract the token from the response
    const token = response.data.token

    // Store the token in local storage
    localStorage.setItem('authToken', token)

    return true
  } catch (error) {
    console.error('Login failed:', error)
    return false
  }
}

// Function to make a request with the token in the header



export const authService = {
    loginAndStoreToken
}