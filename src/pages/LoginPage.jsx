import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            if (auth.currentUser) {
                navigate('/dashboard')
            }
        } catch (err) {
            setError("账户或密码错误，请重试！");
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="centered-main home-page-main-content">
            <section className="auth-card">
                <div>
                    <h2 className="auth-title">{t('home.log_in_title')}</h2>
                    
                    {error && (
                    <div className="error-message">
                        {error}
                    </div>
                    )}

                    <form onSubmit={handleLogin} className="auth-form">
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
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-big btn-orange"
                        >
                            {loading ? t('home.validating') : t('home.log_in_title')}
                        </button>
                    </form>
                </div>
            </section>
 
        </main>

    )
}