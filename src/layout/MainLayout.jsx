import Sidebar from "../components/Sidebar"
import { Outlet } from 'react-router-dom';
import DashboardHeader from "../components/DashboardHeader"

export default function MainLayout() {
    return (
        <div className="layout-container">
            <Sidebar />
            
            <div className="content-wrapper">
                <DashboardHeader />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}