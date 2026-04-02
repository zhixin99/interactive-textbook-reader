import { NavLink, useParams } from "react-router-dom"

export default function Header() {
    const {grade, semester, unit} = useParams()
    const NavClass = ({isActive}) => isActive ? "nav-link is-active" : "nav-link"

    return (
        <header>
            <div className="padding-control-container header-padding">
                <nav className={`flex-nav ${grade && semester && "grid-nav"}`}>
                    <div className="avatar-name-container">
                        <NavLink className="avatar" to="/"><img src="/img/avatar.jpg" /></NavLink>
                        <span className="name">石老师英语</span>
                    </div>
                    <NavLink to="/"><i className="fa-solid fa-house"></i>主页</NavLink>
                    { grade && semester && (
                        <>
                            <NavLink className={NavClass} to={`/text/${grade}/${semester}/${unit}`}><i className="fa-solid fa-book-open"></i>课文</NavLink> 
                            <NavLink className={NavClass} to={`/vocabulary/${grade}/${semester}/${unit}`}><i className="fa-solid fa-language"></i>单词</NavLink> 
                            <NavLink className={NavClass} to={`/dictation/${grade}/${semester}/${unit}`}><i className="fa-solid fa-pen"></i>默写</NavLink> 
                            <NavLink className={NavClass} to={`/review/${grade}/${semester}/${unit}`}><i className="fa-solid fa-triangle-exclamation"></i>错题</NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}