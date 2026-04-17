import Sidebar from "../components/Sidebar"
import { Outlet } from 'react-router-dom';
import Header from "../components/Header"

export default function MainLayout() {
    return (
        <div className="layout-container">
            <Sidebar />
            
            <div className="content-wrapper">
                <Header />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}