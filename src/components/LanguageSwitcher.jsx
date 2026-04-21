import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'zh' ? 'en' : 'zh';
        i18n.changeLanguage(newLang);
    };

    return (
        <button onClick={toggleLanguage} className="btn btn-mini btn-white">
            {i18n.language === 'zh' ? 'EN' : '中文'}
            <i class="fa-solid fa-repeat"></i>
        </button>
    );
}