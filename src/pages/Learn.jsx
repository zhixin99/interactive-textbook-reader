import { useNavigate } from "react-router-dom"
import { textbookData } from "../data/textbookData.js"
import { useAuth } from '../context/AuthContext'
import { db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import LearnSection from "../components/LearnSection.jsx"


export default function Learn() {
    
    const { userData, user } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation()
    const imgSrc = `/textbook-img/grade${userData.currentGrade}/semester${userData.currentSemester}/unit${userData.currentUnit}/page1.png`

    if (!userData || !userData.currentGrade) {
        return <div className="p-8 font-mono">{t('dashboard.load')}</div>;
    }

    const unitsArray = textbookData.filter((item) => (
            item.grade === userData.currentGrade && item.semester === userData.currentSemester
        ))
    
    const unitObj = unitsArray.filter(item => item.unit === userData.currentUnit)[0]
    const unitTitle = unitObj?.title
    const unitIcon = unitObj?.icon
    
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
                <div className="title-icon">{item.icon}</div>
            </div>

            <div className="unit-container-bottom">
                <div>
                    <h3>Unit{item.unit}</h3>
                    <p className="description">{item.title}</p>
                </div>
  

                <button 
                    key={item.unit}
                    onClick={() => handleSelect(item.grade, item.semester, item.unit)}
                    className="btn btn-long btn-no-background"
                >
                    {t('dashboard.start')}
                </button>
            </div>
                          
        </div>

    ))


    return (
        <>
            {userData.currentUnit && (
                <LearnSection
                    icon={<i class="fa-solid fa-clock-rotate-left section-header-icon"></i>}
                    title={t('dashboard.last_lesson')}
                >
                    <div className="last-lesson-container">
                        <div className="last-lesson-container-left">
                            <div className="cover-image-container">
                                <img src={imgSrc} alt={`Cover image of unit${userData.currentUnit}`} className="unit-cover-image"/>
                            </div>
                        </div>

                        <div className="last-lesson-container-right">
                            <h3 className="last-lesson-title"> Unit{userData.currentUnit}{unitIcon}</h3>
                            <p className="description">{unitTitle}</p>
                            <button 
                                onClick={() => navigate(`/learn/${userData.currentGrade}/${userData.currentSemester}/${userData.currentUnit}/text`)}
                                className="btn btn-long btn-orange continue-btn"
                            >
                                {t('dashboard.continue')} <i class="fa-solid fa-circle-chevron-right"></i> 
                            </button>
                        </div>
                    </div>
                </LearnSection>
            )}

            <LearnSection 
                icon={<i class="fa-solid fa-layer-group section-header-icon"></i>}
                title={t('dashboard.courses')}
            >
                <div className="all-courses-container">
                    {unitsEl}
                </div>
            </LearnSection>
        </>
    ) 
}