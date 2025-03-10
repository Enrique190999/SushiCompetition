import { db } from "../Firestore/initializeapp";
import { doc, getDoc } from "firebase/firestore";

export async function checkGameExists(id: string) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            return { error: "El juego no existe", message: undefined };
        }

        return { error: undefined, message: "El juego existe" };

    } catch (error) {
        console.error("Error al unirse al juego:", error);
        return { error: "Error al unirse al juego", message: undefined };
    }
}

