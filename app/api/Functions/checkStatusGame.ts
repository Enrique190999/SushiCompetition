import { db } from "../Firestore/initializeapp";
import { doc, getDoc } from "firebase/firestore";

export async function isGameWaiting(id: string) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            return { error: "El juego no existe", status: undefined };
        }

        const gameData = gameSnapshot.data();
        const status = gameData.status || "pending"; // Asumimos "pending" si no hay status

        return status === "waiting";
    } catch (error) {
        console.error("Error al verificar el estado del juego:", error);
        return { error: "Error al verificar el estado del juego", status: undefined };
    }
}
