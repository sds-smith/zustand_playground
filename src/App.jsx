import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useStore } from './store/store'
import Home from './Home'
import Category from './Category'
import './App.css'


function App() {
  const root = useStore((state) => state.root)
  const updateRoot = useStore((state) => state.updateRoot)

  useEffect(() => {
    if (!root) {
      fetch('https://swapi.dev/api/')
        .then(response => response.json()
          .then(jsonResponse => updateRoot(jsonResponse)))
    } 
  }, [root, updateRoot])

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default App
