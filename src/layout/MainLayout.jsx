import Sidebar from "../components/Sidebar"
import { Outlet } from 'react-router-dom';
import Header from "../components/Header"

export default function MainLayout() {
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </>

    )
}