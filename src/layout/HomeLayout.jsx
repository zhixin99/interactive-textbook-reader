import HomeHeader from "../components/HomeHeader.jsx"
import Footer from "../components/Footer.jsx"
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
    
    return (
        <div className="home-page-container">  
            <HomeHeader />
        
            <Outlet />

            <Footer />
        </div>

    )
}
