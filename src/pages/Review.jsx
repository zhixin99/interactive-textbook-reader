import Header from "../components/Header.jsx"
import Sidebar from "../components/Sidebar.jsx"
import { clearMistake } from "../utility/clearMistake.js"
import { textbookData } from "../data/textbookData.js"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"


export default function Review() {
    const { userData, user } = useAuth() 
    const [userInputs, setUserInputs] = useState({})
    const [statuses, setStatuses] = useState({})

    const mistakes = userData?.mistakes || []

    function handleInputChange(id, value) {
        setUserInputs(prev => ({ ...prev, [id]: value }))
        setStatuses(prev => ({ ...prev, [id]: null }))
    }

    function checkAnswer(id, answer) {
        const input = (userInputs[id] || "").trim().toLowerCase()

        if (input === answer.toLowerCase()) {
            setStatuses(prev => ({ ...prev, [id]: "is-correct" }))
            setTimeout(() => clearMistake(user, id), 1500)
        } else {
            setStatuses(prev => ({ ...prev, [id]: "is-wrong" }))
        }
    }

    const mistakeArray = mistakes.map(id => {
        const [g, s, u] = id.split('-')
        const unit = textbookData.find(item => 
            item.grade === Number(g) && item.semester === Number(s) && item.unit === Number(u))
        return unit?.words?.find(word => word.id === id)
    }).filter(Boolean)

    
    const mistakeEl = mistakeArray.map(vocab => (
            <div className="dictation-card">
                <form 
                    className="dictation-form" 
                    onSubmit={(e) => {
                        e.preventDefault()
                        checkAnswer(vocab.id, vocab.en)
                    }}
                >
                    <div className="dictation-btn-box flex flex-center">
                        <div className="play-btn icon-btn flex flex-center" onClick={() => speak(vocab.en)}>🔊</div>
                        <div className="hint-btn icon-btn flex flex-center">💡</div>
                    </div>
                    <p>{vocab.en}</p>
                    <p>{vocab.cn}</p>
                    <input 
                        type="text" 
                        placeholder="输入单词" 
                        className={`spell-input ${statuses[vocab.id]}`}
                        onChange={(e) => handleInputChange(vocab.id, e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="check-button"
                    >
                        检查
                    </button>
                </form>
            </div>
    ))
    return (
        <>
            <Header />
            <Sidebar />
            <h1>unitTitle</h1>
            {mistakeEl}

        </>
    )
}