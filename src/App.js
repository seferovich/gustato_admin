import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Menu from './components/Menu'
import { useEffect, useState } from 'react'
import { menuServices } from './services/menuServices'

const App = () => {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    menuServices.getMenu()
    .then(data => {

      setMenu(data)
    })
    .catch(error => {
      console.log('Error:', error)
    })
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/menu" element={<Menu menu={menu} />}/>
      </Routes>
    </div>
  )
}

export default App
