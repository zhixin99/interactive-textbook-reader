import { useParams, NavLink } from "react-router-dom"

export default function ModeSelector() {
    const {grade, semester, unit} = useParams()

    const NavClass = ({isActive}) => isActive ? "nav-link is-active" : "nav-link"
    
    return (
        <nav className="sidebar">
            <img src="/img/avatar.jpg" className="avatar" />
            
            <NavLink className={NavClass} to={`/learn/${grade}/${semester}/${unit}/text`}><i className="fa-solid fa-book-open"></i>课文</NavLink>
            <NavLink className={NavClass} to={`/learn/${grade}/${semester}/${unit}/vocabulary`}><i className="fa-solid fa-language"></i>单词</NavLink>
            <NavLink className={NavClass} to={`/learn/${grade}/${semester}/${unit}/dictation`}><i className="fa-solid fa-pen"></i>默写</NavLink>
        </nav>

    )
}