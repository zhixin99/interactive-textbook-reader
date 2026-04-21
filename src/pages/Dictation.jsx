import { getTextbookData } from "../utility/geTextbookData.js"
import { speak } from "../utility/speechUtils.js"
import { useState, useEffect } from "react"
import PageControl from "../components/PageControl.jsx"
import { useAuth } from '../context/AuthContext'
import storeInFirebase from "../utility/storeInFirebase.js"
import { useTranslation } from 'react-i18next'

export default function Dictation() {
    const { user } = useAuth()
    const { vocabArray, grade, semester, unit } = getTextbookData()
    const [userInputs, setUserInputs] = useState({})
    const [statuses, setStatuses] = useState({})
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const maxPageIndex = vocabArray.length - 1
    const currentWord = vocabArray[currentPageIndex]
    const { t } = useTranslation()

    const vocabObj = {}

    for (let i of vocabArray) {
        const id = i.id
        vocabObj[id] = false
    }
    
    const [ hintStatus, setHintStatus ] = useState( vocabObj )

    useEffect(() => {
        setCurrentPageIndex(0)
    }, [grade, semester, unit])
    
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
            setTimeout(() => handleNextPage(), 1000)
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

    function handleHint(id) {
        setHintStatus(prev => ({...prev, [id]: !prev[id]}))
    }

    return (
        <section className="main-content vocab-dictation-mode">
            <PageControl 
                currentIndex={currentPageIndex}
                maxIndex={maxPageIndex}
                onNext={handleNextPage}
                onLast={handleLastPage}
            />

            <div className="vocab-dictation-word-container">
                <form 
                    className="word-form-dictation" 
                    onSubmit={(e) => {
                        e.preventDefault()
                        checkAnswer(currentWord.id, currentWord.en)
                    }}
                >
                    <div className="form-top-part">
                        <div className="question-container">
                            <span className="dictation-chinese">{currentWord.cn}</span>
                            <span className="play-btn btn" onClick={() => speak(currentWord.en)}>
                                <i className="fa-solid fa-volume-high play-btn"></i>
                            </span>
                        </div>
                    </div>

                    <div className="form-bottom-part-dictation">
                        <input 
                            type="text" 
                            placeholder={t('dashboard.inputing')}
                            className={`input-box ${statuses[currentWord.id]}`}
                            onChange={(e) => {handleInputChange(currentWord.id, e.target.value)}}
                            value={userInputs[currentWord.id] || ""}
                        />

                        <div className="hint-container-dictation">
                            <div 
                                className="btn btn-mini btn-green"
                                onClick={() => handleHint(currentWord.id)}
                            >
                                <i class="fa-regular fa-lightbulb"></i> {t('dashboard.hint')}
                            </div>
                            <div 
                                className={!hintStatus[currentWord.id] ? "visually-hidden" : ""}
                            >
                                {currentWord.en}
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-long btn-orange"
                        >
                            {t('dashboard.check')}
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}