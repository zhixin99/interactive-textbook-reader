import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


export default function Home() {    
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <main className="home-page-main-content">
            <div className="home-page-text-container">
                <h1>{t('home.title')}</h1>
                <button 
                    aria-label="A button to log in"
                    onClick={() => navigate('/sign')}
                    className="btn btn-big btn-orange sign-up-button"
                >
                    {t('home.start_button')}
                </button>
            </div>
            <div className="home-page-img-container">
                <img src="/img/G3T1.jpg" alt="Grade3, Term1 textbook." className="cover-image"/>
                <img src="/img/G3T2.jpg" alt="Grade3, Term2 textbook." className="cover-image"/>
                <img src="/img/G4T1.jpg" alt="Grade4, Term1 textbook." className="cover-image"/>
                <img src="/img/G4T2.png" alt="Grade4, Term2 textbook." className="cover-image"/>
                <img src="/img/G5T1.png" alt="Grade5, Term1 textbook." className="cover-image"/>
                <img src="/img/G5T2.png" alt="Grade5, Term2 textbook." className="cover-image"/>
                <img src="/img/G6T1.png" alt="Grade6, Term1 textbook." className="cover-image"/>
                <img src="/img/G6T2.png" alt="Grade6, Term2 textbook." className="cover-image"/>
            </div>
        </main>
    )
}