import { db } from "../Firestore/initializeapp";
import { doc, getDoc } from "firebase/firestore";

export async function checkRolPlayer(id: string, player: string) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            console.error("El juego no existe.");
            return "error";
        }

        const gameData = gameSnapshot.data();
        const admin = gameData?.admin.toLowerCase(); // Acceder de forma segura

        if (!admin) {
            console.error("El documento del juego no contiene un administrador.");
            return "error";
        }
        return admin === player ? "admin" : "player";
    } catch (error) {
        console.error("Error al verificar el administrador del juego:", error);
        return "error";
    }
}
