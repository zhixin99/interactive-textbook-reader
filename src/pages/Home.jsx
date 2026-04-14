import { useNavigate } from 'react-router-dom';

export default function Home() {    
    const navigate = useNavigate()

    return (
        <>
        <main className="home-page-container">

            <section>
                <div className="padding-control-container">
                    <h1>译林英语一点通</h1>
                    <button 
                        aria-label="A button to log in"
                        onClick={() => navigate('/sign')}
                    >
                        开始学习
                    </button>
                </div>
            </section>
        </main>
        </>
    )
}