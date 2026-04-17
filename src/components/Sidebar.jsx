import { NavLink } from "react-router-dom"

export default function Sidebar() {
    
    const NavClass = ({isActive}) => isActive ? "nav-link is-active" : "nav-link"

    return (
        <nav className="sidebar">
            <img src="/img/avatar.jpg" className="avatar" />

            <NavLink className={NavClass} to={`/dashboard`}><i className="fa-solid fa-book-open"></i>主页</NavLink> 
            <NavLink className={NavClass} to={`/learn`}><i className="fa-solid fa-language"></i>学习</NavLink>  
            <NavLink className={NavClass} to={`/review`}><i className="fa-solid fa-triangle-exclamation"></i>错题</NavLink>
        </nav>
    ) 
}