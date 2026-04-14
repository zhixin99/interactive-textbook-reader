import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
	const [userData, setUserData] = useState(null)
    const [isPaid, setIsPaid] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      	const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
			setLoading(true)
			setUser(currentUser)
			if (currentUser) {
				const unsubscribeDoc = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
					if (docSnap.exists()) {
						const data = docSnap.data()
						setUserData(data);
						setIsPaid(data.isPaid || false)
					}
					setLoading(false)
				});
				
				return () => unsubscribeDoc()
			} else {
				setUserData(null)
				setLoading(false)
				setIsPaid(false)
			}
		})

		return () => unsubscribeAuth()
    }, [])

	const logout = () => signOut(auth)

	return (
		<AuthContext.Provider value={{ user, userData, setUserData, isPaid, setIsPaid, loading, logout }}>
		{!loading && children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)