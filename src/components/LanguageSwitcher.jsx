import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'zh' ? 'en' : 'zh';
        i18n.changeLanguage(newLang);
    };

    return (
        <button onClick={toggleLanguage} className="btn btn-mini">
            {i18n.language === 'zh' ? 'English' : '中文'}
        </button>
    );
}