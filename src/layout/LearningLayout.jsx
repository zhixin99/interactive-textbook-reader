import ModeSelector from "../components/ModeSelector"
import UnitSelector from "../components/UnitSelector"
import { Outlet } from 'react-router-dom'

export default function LearningLayout() {
    
    return (
        <>  
            <UnitSelector />
            <ModeSelector />
            <main>
                <Outlet />
            </main>
        </>

    )
}
