import { useState, useEffect } from "react"
import { speak } from "../utility/speechUtils.js"
import { getTextbookData } from "../utility/geTextbookData.js"
import { useAuth } from "../context/AuthContext"
import PageControl from "../components/PageControl.jsx"
import storeInFirebase from "../utility/storeInFirebase.js"


export default function Text() {
    const { user } = useAuth()
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const [translationEl, setTranslationEl] = useState("")

    const { pagesArray, grade, semester, unit } = getTextbookData()
    const maxPageIndex = pagesArray.length - 1
    const currentPage = pagesArray[currentPageIndex]

    useEffect(() => {
        setCurrentPageIndex(0)
        setTranslationEl("")
    }, [grade, semester, unit])
    
    async function handleNextPage() {
        if (currentPageIndex < maxPageIndex ) {
            setCurrentPageIndex(prev => prev + 1)
        }

        setTranslationEl("")

        if (currentPageIndex === maxPageIndex - 1) {
            await storeInFirebase(user, "learntUnits", `G${grade}_S${semester}_U${unit}`)
        }

    }

    function handleLastPage() {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(prev => prev - 1)
        } 

        setTranslationEl("")
    }

    const hotmapEl = currentPage.sentences.map(sentence => (
        <div 
            className="hotspot-box"
            key={sentence.id}
            style={{
                left: `${sentence.left}%`,
                top: `${sentence.top}%`,
                width: `${sentence.w}%`,
                height: `${sentence.h}%`,
            }}
            onClick={(e) => {
                e.stopPropagation()
                handleHotmapClick(sentence.id)
            }
            }
        >
        </div>
    ))

    function handleHotmapClick(clickedId=0) {
        const clickedSentence = currentPage.sentences.filter(sentence => sentence.id === clickedId)[0]
        
        setTranslationEl((
            <div 
                style={{                
                    left: `${clickedSentence.left}%`,
                    top: `${clickedSentence.top + clickedSentence.h + 1}%`
                }}
                className="translation-box"
            >
                {clickedSentence.cn}
            </div>
        ))

        speak(clickedSentence.en)
    }


    return (
        <div onClick={() => setTranslationEl("")}>  

            <section className="main-content text-mode" >
                    <PageControl 
                        currentIndex={currentPageIndex}
                        maxIndex={maxPageIndex}
                        onNext={handleNextPage}
                        onLast={handleLastPage}
                    />

                    <div className="img-container" id="img-container">
                        <img 
                            className="textbook-img" 
                            alt="课文原文" 
                            src={`/textbook-img/grade${grade}/semester${semester}/unit${unit}/${currentPage.image}`} 
                        />
                        <div className="hotmap-layer">
                            {hotmapEl}
                        </div>
                        <div id="translation-layer" className="translation-layer">
                            {translationEl}
                        </div>
                    </div>
                
            </section>

        </div>

    )
}