import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useStore, selectors } from './store/store'
import Home from './Home'
import Category from './Category'
import './App.css'


function App() {
  const root = useStore(selectors.root)
  const fetchRoot = useStore(selectors.fetchRoot)

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
