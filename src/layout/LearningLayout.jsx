import ModeSelector from "../components/ModeSelector"
import LearnHeader from "../components/LearnHeader"
import { Outlet } from 'react-router-dom'

export default function LearningLayout() {
    
    return (
        <>  
            <ModeSelector />
            
            <div className="content-wrapper">
                <LearnHeader />
                <main>
                    <Outlet />
                </main>
            </div>

        </>

    )
}
