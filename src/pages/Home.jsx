import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


export default function Home() {    
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <main>
            <section className="home-page-background-container">
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
            </section>
        </main>
    )
}