import { useParams, NavLink } from "react-router-dom"
import { useTranslation } from 'react-i18next'

export default function ModeSelector() {
    const {grade, semester, unit} = useParams()
    const { t } = useTranslation()

    const NavClass = ({isActive}) => isActive ? "nav-link is-active" : "nav-link"
    
    return (
        <nav className="sidebar">
            <img src="/img/logo.png" alt="English with Shi" className="avatar"/>
            
            <NavLink className={NavClass} to={`/learn/${grade}/${semester}/${unit}/text`}><i className="fa-solid fa-book-open"></i>{t('learn.textbook')}</NavLink>
            <NavLink className={NavClass} to={`/learn/${grade}/${semester}/${unit}/vocabulary`}><i className="fa-solid fa-language"></i>{t('learn.vocabulary')}</NavLink>
            <NavLink className={NavClass} to={`/learn/${grade}/${semester}/${unit}/dictation`}><i className="fa-solid fa-pen"></i>{t('learn.dictation')}</NavLink>
        </nav>

    )
}