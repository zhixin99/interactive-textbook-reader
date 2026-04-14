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
        <header>
            <div className="header-container">
                <div>
                    <button 
                        to={`/learn/${grade}/${semester}/${unit}/${mode}`}
                        key={unit}
                        onClick={toggleDropdown}

                    >
                        Unit{unit}
                    </button>

                    {open && (
                        <div className="dropdown-menu">
                            {dropdownEl}
                        </div>
                    )}
                </div>
                <div onClick={closeLearnPage}>X</div>
            </div>

        </header>
    ) 
}