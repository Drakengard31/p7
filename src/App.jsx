import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="properties" element={<Properties />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} /> {/* Route pour les pages non trouvées */}
            </Route>
        </Routes>
    )
}

export default App
