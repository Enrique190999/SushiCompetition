import { db } from "../Firestore/initializeapp";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export async function joinToGame(id: string, player: string) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            return { error: "El juego no existe", message: undefined };
        }
        
        const gameData = gameSnapshot.data();
        const eat = gameData.eat || [];
        const players = gameData.players || []; 
        const status = gameData.status || "pending"; // Si no existe status, se asume "pending"

        // Verificar si el juego ya ha finalizado
        if (status === "finish") {
            return { error: "La partida ya ha finalizado", message: undefined };
        }

        // Si el jugador ya está en la lista, no lo agregamos
        if (players.includes(player)) {
            return { error: "El jugador ya está en la partida", message: undefined };
        }

        await updateDoc(gameRef, {
            players: [...players, player],
            eat:[...eat,"0<0<0<0"]
        });

        console.log(`Juego con ID: ${id}, Jugador añadido: ${player}`);
        return { error: undefined, message: "Jugador añadido con éxito" };
    } catch (error) {
        console.error("Error al unirse al juego:", error);
        return { error: "Error al unirse al juego", message: undefined };
    }
}

