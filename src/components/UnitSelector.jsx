import { useParams, useLocation, useNavigate } from "react-router-dom"
import { textbookData } from "../data/textbookData.js"
import { useState } from "react"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { db } from "../firebaseConfig"


export default function UnitSelector() {
    const { user } = useAuth()
    const { grade, semester, unit} = useParams()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [isSaving, setIsSaving] = useState(false)

    const path = useLocation().pathname

    let mode = ""

    if (path.includes("/text")) {
        mode = "text"
    } else if (path.includes("/vocabulary")) {
        mode="vocabulary"
    } else if (path.includes("/dictation")) {
        mode="dictation"
    } else if (path.includes("/review")) {
        mode="review"
    }

    const unitsArray = textbookData.filter((item) => (
            item.grade === Number(grade) && item.semester === Number(semester)
        ))
    
    function toggleDropdown() {
        setOpen(prev => !prev)
    }

    async function handleSelect(selectedUnit) {
        setOpen(false)
        navigate(`/learn/${grade}/${semester}/${selectedUnit}/${mode}`)
        
        if (!user || isSaving) return
        setIsSaving(true)

        try {
            await setDoc(doc(db, "users", user.uid), {
                currentUnit: selectedUnit,
                lastUpdated: serverTimestamp()
            }, { merge: true })

        } catch (err) {
            console.error(err.message)
        } finally {
            setIsSaving(false)
        }
    }

    const dropdownEl = unitsArray.map(item => (
        <div
            key={item.unit}
            className="dropdown-item"
            onClick={() => handleSelect(item.unit)}
        >
            Unit{item.unit}
        </div>
    ))

    function closeLearnPage() {
        navigate("/learn")
    }
    
    return (
        <header className="fixed-header">
                <div className="selector-container">
                    <button 
                        to={`/learn/${grade}/${semester}/${unit}/${mode}`}
                        key={unit}
                        onClick={toggleDropdown}
                        className="grade-selector"

                    >
                        Unit{unit}
                        <div>
                            <svg className="down-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M11.996 17.6c.381 0 .71-.161 1.002-.474l6.647-7.287c.23-.247.355-.55.355-.91 0-.74-.55-1.329-1.233-1.329-.338 0-.657.142-.906.408l-5.857 6.452L6.14 8.008c-.249-.256-.56-.408-.905-.408C4.55 7.6 4 8.188 4 8.928c0 .36.124.664.355.92l6.647 7.278c.31.322.62.474.994.474"></path>
                            </svg>
                        </div>
                    </button>

                    {open && (
                        <div className="dropdown-menu">
                            {dropdownEl}
                        </div>
                    )}
                </div>
                <div onClick={closeLearnPage} className="back-button">✕</div>
        </header>
    ) 
}