import { useTranslation } from 'react-i18next'
import LanguageSwitcher from "./LanguageSwitcher";

export default function HomeHeader() {
    const { t } = useTranslation()
    return (
        <header>
            <div className="header-container">
                <img src="/img/logo.png" alt="English with Shi" className="logo"/>
                <LanguageSwitcher />   
            </div>            
        </header>
    )
}