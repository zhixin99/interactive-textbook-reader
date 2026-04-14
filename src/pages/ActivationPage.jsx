import { useState } from 'react';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext'; 
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { setDoc } from "firebase/firestore";

export default function ActivationPage() {
    const [inputCode, setInputCode] = useState('');
    const [status, setStatus] = useState('idle'); 
    const { user, setIsPaid } = useAuth(); 
    const navigate = useNavigate();

    const handleActivate = async (e) => {
        e.preventDefault();
        if (!inputCode) return;

        setStatus('loading');

        try {
            const q = query(
                collection(db, "activation_codes"), 
                where("code", "==", inputCode), 
                where("isUsed", "==", false)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const codeDoc = querySnapshot.docs[0];

                
                await updateDoc(doc(db, "activation_codes", codeDoc.id), {
                    isUsed: true,
                    activatedBy: user.uid
                });

                await setDoc(doc(db, "users", user.uid), {
                    isPaid: true
                }, { merge: true })

                setIsPaid(true)
                
                navigate('/select-grade')
            } else {
                alert("激活码无效！");
                setStatus('idle');
            }
        } catch (error) {
            console.error("Activation error:", error);
            alert("An error occurred. Please try again.");
            setStatus('idle');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white font-mono">
            <div className="max-w-md w-full p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="text-2xl font-bold mb-2 uppercase tracking-tighter">请输入激活码</h1>
                <p className="text-sm text-gray-600 mb-6">输入石老师后台发送给你的激活码来解锁全部功能</p>
                
                <form onSubmit={handleActivate} className="space-y-4">
                    <input 
                        type="text" 
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="XXXX-XXXX-XXXX"
                        className="w-full p-3 border-2 border-black focus:outline-none focus:bg-yellow-50 placeholder-gray-400"
                        required
                    />
                    
                    <button 
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-black text-white p-3 font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {status === 'loading' ? '验证中...' : '激活'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
                    <p className="text-xs text-gray-500">
                        没有激活码？ <a href="https://www.xiaohongshu.com/user/profile/66c362ce000000000d026ceb" target="_blank" className="underline font-bold">联系石老师</a>
                    </p>
                </div>
            </div>
        </div>
    );
}