import { clearMistake } from "../utility/clearMistake.js"
import { textbookData } from "../data/textbookData.js"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { speak } from "../utility/speechUtils.js"
import { useTranslation } from 'react-i18next'

export default function Review() {
    const { userData, user } = useAuth() 
    const [userInputs, setUserInputs] = useState({})
    const [statuses, setStatuses] = useState({})
    const { t } = useTranslation()
   
    const mistakes = userData?.mistakes || []
    const mistakesObj = {}

    for (let i of mistakes) {
        mistakesObj[i] = false
    }

    const [ hintStatus, setHintStatus ] = useState( mistakesObj )

    function handleInputChange(id, value) {
        setUserInputs(prev => ({ ...prev, [id]: value }))
        setStatuses(prev => ({ ...prev, [id]: null }))
    }

    function checkAnswer(id, answer) {
        const input = (userInputs[id] || "").trim().toLowerCase()

        if (input === answer.toLowerCase()) {
            setStatuses(prev => ({ ...prev, [id]: "is-correct" }))
            setTimeout(() => clearMistake(user, id), 1000)

        } else {
            setStatuses(prev => ({ ...prev, [id]: "is-wrong" }))
        }
    }

    function handleHint(id) {
        setHintStatus(prev => ({...prev, [id]: !prev[id]}))
    }


    const mistakeArray = mistakes.map(id => {
        const [g, s, u] = id.split('-')
        const unit = textbookData.find(item => 
            item.grade === Number(g) && item.semester === Number(s) && item.unit === Number(u))
        return unit?.words?.find(word => word.id === id)
    }).filter(Boolean)

    
    const mistakeEl = mistakeArray.map(vocab => (
            <section>
                <div className="word-container">
                    <form 
                        className="word-form" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            checkAnswer(vocab.id, vocab.en)
                        }}
                    >
                        <div className="form-top-part">
                            <div className="title-container">
                                <span className="dictation-chinese">{vocab.cn}</span>
                                <span 
                                    className="play-bt btn" 
                                    onClick={() => speak(vocab.en)}
                                >
                                    <i className="fa-regular fa-headphones"></i>
                                </span>
                            </div>
                        </div>

                        <div className="form-bottom-part">
                            <input 
                                type="text" 
                                placeholder={t('dashboard.inputing')}
                                className={`input-box ${statuses[vocab.id]}`}
                                onChange={(e) => handleInputChange(vocab.id, e.target.value)}
                            />

                            <div className="hint-container">
                                <div 
                                    className="btn btn-medium btn-green"
                                    onClick={() => handleHint(vocab.id)}
                                >
                                    <i class="fa-regular fa-lightbulb"></i> {t('dashboard.hint')}
                                </div>
                                <div 
                                    className={!hintStatus[vocab.id] ? "visually-hidden" : ""}
                                >
                                    {vocab.en}
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-small btn-orange"
                            >
                                {t('dashboard.check')}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
    ))
    return (
        <div className="study-box">
            <h2><i className="fa-solid fa-triangle-exclamation"></i> {t('dashboard.my_mistakes')}</h2>
            {mistakeEl}
        </div>
    )
}