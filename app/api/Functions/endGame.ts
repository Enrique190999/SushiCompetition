import { db } from "../Firestore/initializeapp";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function endGame(id: string) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            return { error: "El juego no existe", message: undefined };
        }

        const gameData = gameSnapshot.data();
        const currentStatus = gameData.status || "pending"; 

        // Si el juego ya está finalizado, no hacemos nada
        if (currentStatus === "finish") {
            return { error: "El juego ya ha finalizado", message: undefined };
        }

        // Actualizamos el estado del juego a "finish"
        await updateDoc(gameRef, { status: "finish" });

        console.log(`Partida con ID ${id} finalizada correctamente.`);
        return { error: undefined, message: "Partida finalizada con éxito" };
    } catch (error) {
        console.error("Error al finalizar la partida:", error);
        return { error: "Error al finalizar la partida", message: undefined };
    }
}
