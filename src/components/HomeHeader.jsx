import { useTranslation } from 'react-i18next'
import LanguageSwitcher from "./LanguageSwitcher";

export default function HomeHeader() {
    const { t } = useTranslation()
    return (
        <header>
            <div className="header-container">
                <div className="name">{t('home.header')}</div>
            </div>        

            <LanguageSwitcher />       
        </header>
    )
}