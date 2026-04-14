import { useNavigate } from "react-router-dom"
import { textbookData } from "../data/textbookData.js"
import { useAuth } from '../context/AuthContext'
import { db } from "../firebaseConfig"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useState } from "react"


export default function Learn() {
    
    const { userData, user } = useAuth()
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()

    if (!userData || !userData.currentGrade) {
        return <div className="p-8 font-mono">加载中...</div>;
    }

    const unitsArray = textbookData.filter((item) => (
            item.grade === userData.currentGrade && item.semester === userData.currentSemester
        ))
    
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
            Unit{item.unit}
            <button 
                key={item.unit}
                onClick={() => handleSelect(item.grade, item.semester, item.unit)}
            >
                开始学习
            </button>
        </div>

    ))

    
    return (
        <main>
            
            {userData.currentUnit && (
                <section className="mb-12">
                <h2>
                    上次学习
                </h2>
                <div className="border-4 border-black p-6 flex justify-between items-center bg-yellow-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                    <p className="text-xs uppercase font-bold opacity-60">Last Session</p>
                    <h3 className="text-2xl font-black italic">{userData.currentUnit}</h3>
                    </div>
                    <button 
                        onClick={() => navigate(`/learn/${userData.currentGrade}/${userData.currentSemester}/${userData.currentUnit}/text`)}
                        className="bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
                    >
                        继续学习 →
                    </button>
                </div>
                </section>
            )}

            <section>
                <h2>
                所有课程
                </h2>
                <div>
                    {unitsEl}
                </div>
            </section>
        </main>
    ) 
}