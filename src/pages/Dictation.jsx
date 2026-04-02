import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { getTextbookData } from "../utility/geTextbookData.js"
import { speak } from "../utility/speechUtils.js"
import { useState } from "react"
import { saveMistake } from "../utility/mistakeUtils"

export default function Dictation() {

    const { vocabArray, unitTitle, grade, semester, unit } = getTextbookData()
    const [userInputs, setUserInputs] = useState({})
    const [statuses, setStatuses] = useState({})

    function handleInputChange(id, value) {
        setUserInputs(prev => ({ ...prev, [id]: value }))
        setStatuses(prev => ({ ...prev, [id]: null }))
    }

    function checkAnswer(id, answer) {
        const input = (userInputs[id] || "").trim().toLowerCase()
        const correctAnswer = answer.toLowerCase()

        if (input === correctAnswer) {
            setStatuses(prev => ({ ...prev, [id]: "is-correct" }))
        } else {
            setStatuses(prev => ({ ...prev, [id]: "is-wrong" }))
            saveMistake(id)
        }
    }

    const dictationEl = vocabArray.map( vocab => {
        const currentStatus = statuses[vocab.id] || ""

        return (
            <div className="dictation-card">
                <form 
                    className="dictation-form flex flex-column flex-center" 
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
                        className={`spell-input ${currentStatus}`}
                        onChange={(e) => {handleInputChange(vocab.id, e.target.value)}}
                    />
                    <button 
                        type="submit" 
                        className="check-button"
                    >
                        检查
                    </button>
                </form>
            </div>
        )
    })


    return (
        <>
            <Header />
            <Sidebar />
            <section >
                <div className="padding-control-container">
                    <h1>{unitTitle}</h1>
                    <div className="words-container">
                        {dictationEl}
                    </div>
                </div>
            </section>
        </>

    )
}