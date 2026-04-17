import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
    const { userData } = useAuth()

    const learntUnits = userData?.learntUnits?.length || 0
    const dictatedWords = userData?.dictatedWords?.length || 0


    return (
        <>  
            <section className="study-box width-limit">
                <h2><i className="fa-regular fa-lightbulb"></i> 学习进度</h2>
                <div className="card-container">
                    <div className="stats-card box-pink">
                        <i class="fa-solid fa-book"></i>
                        <div className="text-bold">已学</div >
                        <div className="study-data">{learntUnits}个单元</div>
                    </div>
                    <div className="stats-card box-cyan">
                        <i class="fa-regular fa-comment-dots"></i>
                        <div className="text-bold">已默</div>
                        <div className="study-data">{dictatedWords}个单词</div>
                    </div>
                </div>

            </section>

        </>
        
    )
}