import { useNavigate } from "react-router-dom"
import { textbookData } from "../data/textbookData.js"
import { useAuth } from '../context/AuthContext'
import { db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useTranslation } from 'react-i18next'


export default function Learn() {
    
    const { userData, user } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation()

    if (!userData || !userData.currentGrade) {
        return <div className="p-8 font-mono">{t('dashboard.load')}</div>;
    }

    const unitsArray = textbookData.filter((item) => (
            item.grade === userData.currentGrade && item.semester === userData.currentSemester
        ))
    
    const unitObj = unitsArray.filter(item => item.unit === userData.currentUnit)[0]
    const unitTitle = unitObj.title
    const unitIcon = unitObj.icon
    
    async function handleSelect(selectedGrade, selectedSemester, selectedUnit) {
        navigate(`/learn/${selectedGrade}/${selectedSemester}/${selectedUnit}/text`)
        
        if (!user || isSaving) return
        setIsSaving(true)

        try {
            await setDoc(doc(db, "users", user.uid), {
                currentUnit: selectedUnit
            }, { merge: true })
        } catch (err) {
            console.error(err.message)
        } finally {
            setIsSaving(false)
        }
    }

    const unitsEl = unitsArray.map(item => (
        <div className="unit-container">
            <div className="unit-container-top">
                <h3>Unit{item.unit}</h3>
                <div className="title-container">
                    <span className="title-icon">{item.icon}</span>
                    <span> {item.title}</span>
                </div>
            </div>
            <button 
                key={item.unit}
                onClick={() => handleSelect(item.grade, item.semester, item.unit)}
                className="btn btn-medium btn-orange start-btn"
            >
                {t('dashboard.start')}
            </button>
        </div>

    ))


    return (
        <div className="learn-container">
            {userData.currentUnit && (
                <section className="study-box width-limit">
                    <h2><i class="fa-regular fa-hourglass"></i> {t('dashboard.last_lesson')}</h2>
                    
                    <div className="unit-container">
                        <div className="unit-container-top">
                            <h3>Unit{userData.currentUnit}</h3>
                            <div className="title-container">
                                <span className="title-icon">{unitIcon}</span>
                                <p>{unitTitle}</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate(`/learn/${userData.currentGrade}/${userData.currentSemester}/${userData.currentUnit}/text`)}
                            className="btn btn-medium btn-orange start-btn"
                        >
                            {t('dashboard.continue')}
                        </button>
                    </div>
                </section>
            )}

            <section className="study-box">
                <h2><i class="fa-solid fa-chalkboard"></i> {t('dashboard.courses')}</h2>
                <div className="units-container">
                    {unitsEl}
                </div>
            </section>
        </div>
    ) 
}