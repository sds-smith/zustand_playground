import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useStore } from './store/store'
import Home from './Home'
import Category from './Category'
import './App.css'


function App() {
  const root = useStore((state) => state.root)
  const fetchRoot = useStore((state) => state.fetchRoot)

  useEffect(() => {
    if (!root) fetchRoot();
  }, [fetchRoot, root])

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default App
