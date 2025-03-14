import { db } from "../Firestore/initializeapp";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export async function startGameFunction(id: string, creator: string) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            console.error("El juego no existe");
            return;
        }

        const gameData = gameSnapshot.data();
        const players = Array.isArray(gameData.players) ? [...gameData.players] : [];
        const eat = Array.isArray(gameData.eat) ? [...gameData.eat] : [];

        const creatorUpper = creator.toUpperCase();

        // Si el creador no está en `players`, lo agregamos junto con su entrada en `eat`
        if (!players.includes(creatorUpper)) {
            players.push(creatorUpper);
            eat.push("0<0<0<0"); // Añadimos una entrada en `eat` sincronizada con `players`
        }

        await updateDoc(gameRef, {
            status: "playing",
            admin: creatorUpper,
            players,
            eat
        });

        console.log(`Juego iniciado con ID: ${id}, Admin: ${creatorUpper}`);
    } catch (error) {
        console.error("Error al iniciar el juego:", error);
    }
}
