import { Routes, Route } from 'react-router-dom'
import Layout from '@components/layout/Layout.jsx'
import Home from './pages/home/Home.jsx'
import Properties from './pages/Property/Properties.jsx'
import PropertyDetails from './pages/Property/PropertyDetails.jsx' // Ajout du composant de détail
import About from './pages/about/About.jsx'
import NotFound from './notFound/NotFound.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}> {/* Layout contient Header/Footer */}
                <Route index element={<Home />} />
                <Route path="properties" element={<Properties />} />
                <Route path="properties/:id" element={<PropertyDetails />} /> {/* Nouvelle route */}
                <Route path="about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} /> {/* Route 404 */}
        </Routes>
    )
}

export default App
