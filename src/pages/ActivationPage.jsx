import { useState } from 'react';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext'; 
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { setDoc } from "firebase/firestore"
import { useTranslation } from 'react-i18next'

export default function ActivationPage() {
    const [inputCode, setInputCode] = useState('');
    const [status, setStatus] = useState('idle'); 
    const { user, setIsPaid } = useAuth(); 
    const navigate = useNavigate()
    const { t } = useTranslation()

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
        <main className="centered-main home-page-main-content">
            <section className="auth-card">
                <div className="auth-header">
                    <button onClick={() => navigate('/')} className="back-button">✕</button>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill"></div>
                    </div>
                </div>

                <div>
                    <h2 className="auth-title">{t('home.activation_title')}</h2>
                    
                    <form onSubmit={handleActivate} className="auth-form">

                        <div className="input-group">
                            <label>{t('home.activation_code')}</label>
                            <input 
                                type="text" 
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                placeholder="XXXX-XXXX-XXXX"
                                className="input-box"
                                required
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className="btn btn-big btn-orange"
                        >
                            {status === 'loading' ? t('home.validating') : t('home.activate')}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>{t('home.no_activation_code')}</span>
                        <a 
                            href="https://www.xiaohongshu.com/user/profile/66c362ce000000000d026ceb" 
                            target="_blank" 
                            className="btn btn-small btn-no-border"
                        >
                            {t('home.contact_shi')}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}