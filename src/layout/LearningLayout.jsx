import ModeSelector from "../components/ModeSelector"
import UnitSelector from "../components/UnitSelector"
import { Outlet } from 'react-router-dom'

export default function LearningLayout() {
    
    return (
        <>  
            <ModeSelector />
            
            <div className="content-wrapper">
                <UnitSelector />
                <main>
                    <Outlet />
                </main>
            </div>

        </>

    )
}
