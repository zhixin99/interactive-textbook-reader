import { getTextbookData } from "../utility/geTextbookData.js"
import { speak } from "../utility/speechUtils.js"
import highlightWord from "../utility/highlightWord.jsx"
import { useState } from "react"
import PageControl from "../components/PageControl.jsx"

export default function Vocabulary() {
    const { vocabArray, unitTitle } = getTextbookData()
    
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const maxPageIndex = vocabArray.length - 1
    const currentWord = vocabArray[currentPageIndex]
    
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
            <section className="main-content">
                <div className="padding-control-container vocab-dictation-mode">
                    <h1>{unitTitle}</h1>
                    <div className="words-container">
                        <div className="word-card">
                            <div className="word-card-top-part">
                                <div className="word-icon">{currentWord.icon}</div>
                                <div className="word-info">
                                    <div className="word-en">{currentWord.en}</div>
                                    <div className="word-cn">{currentWord.cn}</div>
                                </div>
                                <div className="play-btn btn" onClick={() => speak(currentWord.en)}>🔊</div>
                            </div>
                            <div className="word-card-bottom-part">
                                <div className="sentence-box">
                                    <div className="sent-en">{highlightWord(currentWord.sent, currentWord.en)}</div>
                                    <div className="sent-cn">{currentWord.sent_cn}</div> 
                                </div>
                                <div className="play-btn btn" onClick={() => speak(currentWord.sent)}>🔊</div>
                            </div>
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