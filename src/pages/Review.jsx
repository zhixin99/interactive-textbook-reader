import Header from "../components/Header.jsx"
import Sidebar from "../components/Sidebar.jsx"
import { getMistakeList, clearMistake } from "../utility/mistakeUtils.js"
import { textbookData } from "../data/textbookData.js"
import { useState } from "react"

export default function Review() {
    const [mistakes, setMistakes] = useState(getMistakeList())
    const [userInputs, setUserInputs] = useState({})
    const [statuses, setStatuses] = useState({})
    
    console.log(textbookData)

    function handleInputChange(id, value) {
        setUserInputs(prev => ({ ...prev, [id]: value }))
        setStatuses(prev => ({ ...prev, [id]: null }))
    }

    function checkAnswer(id, answer) {
        const input = (userInputs[id] || "").trim().toLowerCase()
        const correctAnswer = answer.toLowerCase()

        if (input === correctAnswer) {
            setStatuses(prev => ({ ...prev, [id]: "is-correct" }))
            clearMistake(id)
            setMistakes(getMistakeList())
        } else {
            setStatuses(prev => ({ ...prev, [id]: "is-wrong" }))
        }
    }

    const uniqueKeyArray = Object.keys(getMistakeList())
    
    const mistakeArray = uniqueKeyArray.map(id => {
        
        const [g, s, u] = id.split('-')

        const unitFolder = textbookData.filter( item => 
            item.grade === Number(g) && item.semester === Number(s) && item.unit === Number(u))[0]

        const wordData = unitFolder.words.filter(word => word.id === id)[0]

        return wordData

    })

    
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