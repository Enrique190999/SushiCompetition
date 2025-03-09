import { db } from "../Firestore/initializeapp";
import { doc, updateDoc } from "firebase/firestore";

export async function startGame(id: string, creator: string) {
    try {
        const gameRef = doc(db, "games", id);

        await updateDoc(gameRef, {
            status: "playing",
            admin: creator
        });

        console.log(`Juego iniciado con ID: ${id}, Admin: ${creator}`);
    } catch (error) {
        console.error("Error al iniciar el juego:", error);
    }
}
