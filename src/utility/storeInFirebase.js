import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../firebaseConfig"

export default async function storeInFirebase(user, field, value) {
    if (!user) return

    try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            [field]: arrayUnion(value)
        });
        console.log("Stored in firebase successfully")
    } catch (error) {
        console.error("Error storing progress:", error)
    }
        
}