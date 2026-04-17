import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
    const { t } = useTranslation()
    return (
        <header className="fixed-header">
            <Link to="/select-grade" className="grade-selector">
                <div>{t('dashboard.grade')}</div> 
                <div>
                    <svg className="down-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11.996 17.6c.381 0 .71-.161 1.002-.474l6.647-7.287c.23-.247.355-.55.355-.91 0-.74-.55-1.329-1.233-1.329-.338 0-.657.142-.906.408l-5.857 6.452L6.14 8.008c-.249-.256-.56-.408-.905-.408C4.55 7.6 4 8.188 4 8.928c0 .36.124.664.355.92l6.647 7.278c.31.322.62.474.994.474"></path>
                    </svg>
                </div>
            </Link>

            <LanguageSwitcher />
        </header>
    )
}