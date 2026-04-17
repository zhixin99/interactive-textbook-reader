import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
    const { userData } = useAuth()
    const { t } = useTranslation()

    const learntUnits = userData?.learntUnits?.length || 0
    const dictatedWords = userData?.dictatedWords?.length || 0


    return (
        <>  
            <section className="study-box width-limit">
                <h2><i className="fa-regular fa-lightbulb"></i> {t('dashboard.progress')}</h2>
                <div className="card-container">
                    <div className="stats-card box-pink">
                        <i class="fa-solid fa-book"></i>
                        <div className="text-bold">{t('dashboard.have_studied')}</div >
                        <div className="study-data">{learntUnits}{t('dashboard.unit')}</div>
                    </div>
                    <div className="stats-card box-cyan">
                        <i class="fa-regular fa-comment-dots"></i>
                        <div className="text-bold">{t('dashboard.have_dictated')}</div>
                        <div className="study-data">{dictatedWords}{t('dashboard.words')}</div>
                    </div>
                </div>

            </section>

        </>
        
    )
}