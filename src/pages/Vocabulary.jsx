import { getTextbookData } from "../utility/geTextbookData.js"
import { speak } from "../utility/speechUtils.js"
import highlightWord from "../utility/highlightWord.jsx"
import { useState, useEffect } from "react"
import PageControl from "../components/PageControl.jsx"

export default function Vocabulary() {
    const { vocabArray, grade, semester, unit } = getTextbookData()
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const maxPageIndex = vocabArray.length - 1
    const currentWord = vocabArray[currentPageIndex]
    
    useEffect(() => {
        setCurrentPageIndex(0)
    }, [grade, semester, unit])
    
    function handleNextPage() {
        if (currentPageIndex < maxPageIndex ) {
            setCurrentPageIndex(prev => prev + 1)
        }
    }

    function handleLastPage() {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(prev => prev - 1)
        } 
    }


    return (
        <>
            <section className="main-content vocab-dictation-mode">
                <PageControl 
                    currentIndex={currentPageIndex}
                    maxIndex={maxPageIndex}
                    onNext={handleNextPage}
                    onLast={handleLastPage}
                />

                <div className="study-box vocab-dictation-word-container">
                    <div className="word-card-top-part">
                        <div className="word-part">
                            <div className="word-icon">{currentWord.icon}</div>
                            
                            <div>
                                <div className="word-en">{currentWord.en}</div>
                                <div className="word-cn">{currentWord.cn}</div>
                            </div>
                        </div>

                        <div className="play-btn btn" onClick={() => speak(currentWord.en)}>
                            <i className="fa-solid fa-volume-high play-btn"></i>
                        </div>
                    </div>
                    
                    <div className="word-card-bottom-part">
                        <div>
                            <div className="sent-en">{highlightWord(currentWord.sent, currentWord.en)}</div>
                            <div className="sent-cn">{currentWord.sent_cn}</div> 
                        </div>
                        <div className="play-btn btn" onClick={() => speak(currentWord.sent)}>
                            <i className="fa-solid fa-volume-high play-btn"></i>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}