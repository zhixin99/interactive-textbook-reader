import { gradeData } from "../data/gradeData.js" 
import { useNavigate } from "react-router-dom"
import { db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

export default function gradeSelector() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [isSaving, setIsSaving] = useState(false)

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
                className="grade-selector btn"
                key={data.id}
                onClick={() => handleSaveSelection(data.grade, data.semester)}
            >
                {data.label}
                <p className="grade-status">可学习</p>
            </button> 
        ) : (
            <div
                className="grade-selector is-disabled"
                key={data.id}
            >
                {data.label}
                <p className="grade-status">即将开放</p>
            </div>
        )
    ))


    
    return (
        <>
        <main className="home-page-container">
            <section>
                <div className="padding-control-container">
                    <p>目前仅有四年级下册可学习。</p>
                    <p>持续更新中！</p>
                </div>
            </section>
            
            <section>
                <div className="padding-control-container">
                    <div className="grade-container">
                        {selectorEl}
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}