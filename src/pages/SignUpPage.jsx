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
        <div className="flex items-center justify-center min-h-screen bg-gray-50 font-mono p-4">
            <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">Create Account</h2>
                <p className="text-xs text-gray-500 mb-6 italic">Step 1: Register your details</p>
                
                {error === "auth/invalid-email" && (
                <div className="bg-red-100 border-l-4 border-red-600 p-3 mb-4 text-sm text-red-700">
                    请输入有效的邮箱！
                </div>
                )}

                {error === "auth/weak-password" && (
                <div className="bg-red-100 border-l-4 border-red-600 p-3 mb-4 text-sm text-red-700">
                    至少需要6位密码！
                </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-6">
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
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white font-bold py-4 uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                    {loading ? '正在创建新账号...' : '注册'}
                </button>
                </form>

                <div className="mt-8 pt-4 border-t border-dashed border-gray-300 text-center text-xs">
                已有账号？ <button onClick={() => navigate('/login')} className="underline font-bold">立刻登录</button>
                </div>
            </div>
        </div>
    )
}