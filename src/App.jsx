import { Routes, Route } from 'react-router-dom'
import Layout from '@components/layout/Layout.jsx'
import Home from './pages/home/Home.jsx'
import Properties from './pages/Property/Properties.jsx'
import PropertyDetails from './pages/Property/PropertyDetails.jsx'
import About from './pages/about/About.jsx'
import NotFound from './notFound/NotFound.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}> {/* Layout contient Header/Footer */}
                <Route index element={<Home />} /> {/* Page d'accueil (/) */}
                <Route path="properties" element={<Properties />} /> {/* Liste des propriétés (/properties) */}
                <Route path="properties/:id" element={<PropertyDetails />} /> {/* Détail d'une propriété (/properties/123) */}
                <Route path="about" element={<About />} /> {/* Page à propos (/about) */}
            </Route>

            {/*NotFound */}
            <Route path="images/*" element={<NotFound />} /> {/* Capture /images et tous ses sous-chemins */}

            <Route path="*" element={<NotFound />} /> {/* Route 404 pour toutes les autres URL non définies */}
        </Routes>
    )
}

export default App
