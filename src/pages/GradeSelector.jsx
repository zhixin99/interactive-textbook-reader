import { gradeData } from "../data/gradeData.js" 
import { useNavigate } from "react-router-dom"
import { db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

export default function gradeSelector() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [isSaving, setIsSaving] = useState(false)
    const { t } = useTranslation()
                                    
    const handleSaveSelection = async (grade, semester) => {
        if (isSaving) return
        setIsSaving(true)

        try {
            await setDoc(doc(db, "users", user.uid), {
                currentGrade: grade,
                currentSemester: semester
            }, { merge: true })

            navigate('/dashboard')
        } catch (err) {
            console.error(err.message)
        } finally {
            setIsSaving(false)
        }
    }

    const selectorEl = gradeData.map( data => (
        data.available ? (
            <button 
                className="btn btn-small btn-orange"
                key={data.id}
                onClick={() => handleSaveSelection(data.grade, data.semester)}
            >
                {data.label}
                <div className="grade-status">{t('home.available')}</div>
            </button> 
        ) : (
            <div
                className="btn-small is-disabled"
                key={data.id}
            >
                {data.label}
                <p className="grade-status">{t('home.not_available')}</p>
            </div>
        )
    ))


    
    return (
        <main className="centered-main home-page-main-content">
            <section className="auth-card">
                <div className="btn">
                    <h3>{t('home.explain')}</h3>
                    <h3>{t('home.updating')}</h3>
                </div>
            
                <div>
                    <div className="grade-container">
                        {selectorEl}
                    </div>
                </div>
            </section>
        </main>
    )
}