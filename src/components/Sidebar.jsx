import { NavLink } from "react-router-dom"
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
    
    const NavClass = ({isActive}) => isActive ? "nav-link is-active" : "nav-link"
    const { t } = useTranslation()

    return (
        <nav className="sidebar">
            <img src="/img/avatar.jpg" className="avatar" />

            <NavLink className={NavClass} to={`/dashboard`}><i className="fa-solid fa-book-open"></i>{t('dashboard.dashboard')}</NavLink> 
            <NavLink className={NavClass} to={`/learn`}><i className="fa-solid fa-language"></i>{t('dashboard.learn')}</NavLink>  
            <NavLink className={NavClass} to={`/review`}><i className="fa-solid fa-triangle-exclamation"></i>{t('dashboard.mistakes')}</NavLink>
        </nav>
    ) 
}