import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { getTextbookData } from "../utility/geTextbookData.js"
import { speak } from "../utility/speechUtils.js"
// import { highlightWord } from "../utility/highlightWord.js"

export default function Vocabulary() {
    const { vocabArray, unitTitle } = getTextbookData()

    const vocabEl = vocabArray.map(vocab => (
        <div className="word-card">
            <div className="word-card-top-part">
                <div className="word-icon icon-btn">{vocab.icon}</div>
                <div className="word-info">
                    <div className="word-en">{vocab.en}</div>
                    <div className="word-cn">{vocab.cn}</div>
                </div>
                <div className="play-btn icon-btn" onClick={() => speak(vocab.en)}>🔊</div>
            </div>
            <div className="word-card-bottom-part">
                <div className="sentence-box">
                    <div className="sent-en">{vocab.sent}</div>
                    <div className="sent-cn">{vocab.sent_cn}</div> 
                </div>
                <div className="play-btn icon-btn" onClick={() => speak(vocab.sent)}>🔊</div>
            </div>
        </div>
    ))


    return (
        <>
            <Header />
            <Sidebar />
            <section >
                <div className="padding-control-container">
                    <h1>{unitTitle}</h1>
                    <div className="words-container">
                        {vocabEl}
                    </div>
                </div>
            </section>

        </>
    )
}