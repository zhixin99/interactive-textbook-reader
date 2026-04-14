import { getTextbookData } from "../utility/geTextbookData.js"
import { speak } from "../utility/speechUtils.js"
import { useState } from "react"
import PageControl from "../components/PageControl.jsx"
import { useAuth } from '../context/AuthContext'
import storeInFirebase from "../utility/storeInFirebase.js"

export default function Dictation() {
    const { user } = useAuth()
    const { vocabArray, unitTitle } = getTextbookData()
    const [userInputs, setUserInputs] = useState({})
    const [statuses, setStatuses] = useState({})
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const maxPageIndex = vocabArray.length - 1
    const currentWord = vocabArray[currentPageIndex]

    function handleInputChange(id, value) {
        setUserInputs(prev => ({ ...prev, [id]: value }))
        setStatuses(prev => ({ ...prev, [id]: null }))
    }

    function checkAnswer(id, answer) {
        const input = (userInputs[id] || "").trim().toLowerCase()
        const correctAnswer = answer.toLowerCase()

        if (input === correctAnswer) {
            setStatuses(prev => ({ ...prev, [id]: "is-correct" }))
            storeInFirebase(user, "dictatedWords", id)
        } else {
            setStatuses(prev => ({ ...prev, [id]: "is-wrong" }))
            storeInFirebase(user, "mistakes", id)
        }
    }

    function clearCurrentWordState(id) {
        setUserInputs(prev => ({ ...prev, [id]: "" }))
        setStatuses(prev => ({ ...prev, [id]: null }))
    }

    function handleNextPage() {
        if (currentPageIndex < maxPageIndex ) {
            clearCurrentWordState(currentWord.id)
            setCurrentPageIndex(prev => prev + 1)
        }
    }

    function handleLastPage() {
        if (currentPageIndex > 0) {
            clearCurrentWordState(currentWord.id)
            setCurrentPageIndex(prev => prev - 1)
        } 
    }


    return (
        <>
            <section className="main-content">
                <div className="padding-control-container vocab-dictation-mode">
                    <h1>{unitTitle}</h1>
                    <div className="words-container">
                        <div className="word-card">
                            <form 
                                className="dictation-form" 
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    checkAnswer(currentWord.id, currentWord.en)
                                }}
                            >
                                <div className="dictation-btn-box">
                                    <div className="play-btn btn" onClick={() => speak(currentWord.en)}>🔊</div>
                                    <div className="hint-btn btn">💡</div>
                                </div>
                                <p>{currentWord.en}</p>
                                <p>{currentWord.cn}</p>
                                <input 
                                    type="text" 
                                    placeholder="输入单词" 
                                    className={`spell-input ${statuses[currentWord.id]}`}
                                    onChange={(e) => {handleInputChange(currentWord.id, e.target.value)}}
                                    value={userInputs[currentWord.id] || ""}
                                />
                                <button 
                                    type="submit" 
                                    className="check-button"
                                >
                                    检查
                                </button>
                            </form>
                        </div>
                    </div>

                    <PageControl 
                        currentIndex={currentPageIndex}
                        maxIndex={maxPageIndex}
                        onNext={handleNextPage}
                        onLast={handleLastPage}
                    />
                </div>
            </section>

        </>

    )
}