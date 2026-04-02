import { Link, useParams } from "react-router-dom"

export default function Header() {
    const {grade, semester, unit} = useParams()

    return (
        <header>
            <div className="padding-control-container header-padding">
                <nav>
                    <Link to="/"><i class="fa-solid fa-house"></i>主页</Link>
                    { grade && semester && (
                        <>
                            <Link to={`/text/${grade}/${semester}/${unit}`}><i class="fa-solid fa-book-open"></i>课文</Link> 
                            <Link to={`/vocabulary/${grade}/${semester}/${unit}`}><i class="fa-solid fa-language"></i>单词</Link> 
                            <Link to={`/dictation/${grade}/${semester}/${unit}`}><i class="fa-solid fa-pen"></i>默写</Link> 
                            <Link to={`/review/${grade}/${semester}/${unit}`}><i class="fa-solid fa-triangle-exclamation"></i>错题</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}