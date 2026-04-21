import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isPaid, setIsPaid] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribeDoc = null; 

        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            if (currentUser) {

                if (unsubscribeDoc) unsubscribeDoc();

                unsubscribeDoc = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        setUserData(data);
                        setIsPaid(data.isPaid || false)
                    }
                    setLoading(false) 
                }, (error) => {
                    console.error("Firestore error:", error);
                    setLoading(false); 
                });
            } else {

                if (unsubscribeDoc) unsubscribeDoc();
                setUserData(null)
                setIsPaid(false)
                setLoading(false)
            }
        })

        return () => {
            unsubscribeAuth();
            if (unsubscribeDoc) unsubscribeDoc();
        }
    }, [])

    const logout = () => signOut(auth)

    return (
        <AuthContext.Provider value={{ user, userData, setUserData, isPaid, setIsPaid, loading, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)