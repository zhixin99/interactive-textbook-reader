import { useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation()
    
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                isPaid: false, 
                createdAt: serverTimestamp()
            })

            navigate('/activate')
        } catch (err) {
            setError(err.code)
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <main className="centered-main">
            <section className="auth-card">
                <div className="auth-header">
                    <button onClick={() => navigate('/')} className="back-button">✕</button>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{width: '50%'}}></div>
                    </div>
                </div>

                <div>
                    <h2 className="auth-title">{t('home.create_account_title')}</h2>
                    
                    <form onSubmit={handleSignUp} className="auth-form">
                        <div className="input-group">
                            <label>{t('home.email')}</label>
                            <input
                                type="email"
                                required
                                className="input-box"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>{t('home.password')}</label>
                            <input
                                type="password"
                                required
                                className="input-box"
                                placeholder={t('home.password_placeholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <div className="error-message">
                            {error === "auth/email-already-in-use" ? t('home.email_is_registered') : t('home.wrong_account')}
                        </div>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-big btn-orange btn-sign-up"
                        >
                            {loading ? t('home.creating') : t('home.create_account_button')}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>{t('home.have_account')}</span>
                        <button onClick={() => navigate('/login')} className="btn btn-small btn-no-background">
                            {t('home.log_in_footer')}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}