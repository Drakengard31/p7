import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
    return (
        <div className="layout">
            <Header />
            <main>
                <Outlet /> {/* Ceci est où les pages s'afficheront */}
            </main>
            <Footer />
        </div>
    )
}

export default Layout