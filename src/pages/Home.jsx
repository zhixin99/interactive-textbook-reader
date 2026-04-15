import { useNavigate } from 'react-router-dom'
import HomeHeader from "../components/HomeHeader.jsx"
import Footer from "../components/Footer.jsx"

export default function Home() {    
    const navigate = useNavigate()

    return (
        <main>
            <section className="home-page-background-container">
                <div className="padding-control-container">
                    <h1>译林英语一点通</h1>
                    <button 
                        aria-label="A button to log in"
                        onClick={() => navigate('/sign')}
                        className="btn btn-big sign-up-button"
                    >
                        开始学习
                    </button>
                </div>
            </section>
        </main>
    )
}