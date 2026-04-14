import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
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
        <div className="flex items-center justify-center min-h-screen bg-gray-50 font-mono p-4">
            <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6">Login</h2>
                
                {error && (
                <div className="bg-red-100 border-l-4 border-red-600 p-3 mb-4 text-sm text-red-700">
                    {error}
                </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase mb-1">邮箱</label>
                    <input
                        type="email"
                        required
                        className="w-full border-2 border-black p-3 focus:outline-none focus:bg-yellow-50"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase mb-1">密码</label>
                    <input
                        type="password"
                        required
                        className="w-full border-2 border-black p-3 focus:outline-none focus:bg-yellow-50"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white font-bold py-4 uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                    {loading ? '验证中...' : '登录'}
                </button>
                </form>

                <div className="mt-8 pt-4 border-t border-dashed border-gray-300 text-center">
                <p className="text-xs text-gray-500">
                    Forgot your password? <button className="underline">Reset it</button>
                </p>
                </div>
            </div>
        </div>
    )
}