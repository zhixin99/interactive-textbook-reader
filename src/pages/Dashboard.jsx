import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
    const { userData } = useAuth()

    const learntUnits = userData?.learntUnits?.length || 0
    const dictatedWords = userData?.dictatedWords?.length || 0


    return (
        <>  
            <h2>学习进度</h2>
            <div className="stats-card">
                <i class="fa-solid fa-book"></i>
                <p>已学</p>
                <strong>{learntUnits}</strong>
            </div>
            <div className="stats-card">
                <i class="fa-regular fa-comment-dots"></i>
                <p>已默</p>
                <strong>{dictatedWords}</strong>
            </div>
        </>
        
    )
}