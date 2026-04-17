import { useTranslation } from 'react-i18next'

export default function Footer () {
    const { t } = useTranslation()

    return (
        <footer>
            <div>
                {t('home.footer')}
            </div>
                
            <a 
                className="btn btn-small btn-blue"
                href="https://www.xiaohongshu.com/user/profile/66c362ce000000000d026ceb"
                target="_blank">
                {t('home.follow_button')}
            </a>
        </footer>
    )
}