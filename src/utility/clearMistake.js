import { doc, updateDoc, arrayRemove  } from "firebase/firestore"
import { db } from "../firebaseConfig"


export async function clearMistake(user, vocabId) {
    if (!user) return
    
    try {
        const userRef = doc(db, "users", user.uid)

        await updateDoc(userRef, {
            mistakes: arrayRemove(vocabId)
        })

    } catch (error) {
        console.error("Error clearing mistake:", error)
    }

}