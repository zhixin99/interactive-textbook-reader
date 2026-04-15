import { useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
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
                    <h2 className="auth-title">创建个人档案</h2>
                    
                    <form onSubmit={handleSignUp} className="auth-form">
                        <div className="input-group">
                            <label>邮箱</label>
                            <input
                                type="email"
                                required
                                className="sign-up-input"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>密码</label>
                            <input
                                type="password"
                                required
                                className="sign-up-input"
                                placeholder="需设置至少6位密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <div className="error-message">
                            {error === "auth/email-already-in-use" ? "邮箱已被注册" : "输入有误，请重试"}
                        </div>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-big btn-sign-up"
                        >
                            {loading ? '正在创建...' : '创建账号'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>已有账号？</span>
                        <button onClick={() => navigate('/login')} className="btn btn-small btn-sign-in">
                            立刻登录
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}