import { db } from "../Firestore/initializeapp";
import { doc, getDoc } from "firebase/firestore";

export async function getPlayerScores(id: string) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            return { error: "El juego no existe", data: undefined };
        }

        const gameData = gameSnapshot.data();
        const players: string[] = gameData.players || [];
        const eat: string[] = gameData.eat || [];

        if (players.length !== eat.length) {
            return { error: "Los datos de jugadores y puntuaciones no coinciden", data: undefined };
        }

        // Crear objeto de puntuaciones por jugador
        const playerScores = players.reduce((acc: Record<string, number>, player, index) => {
            // Convertir "1<1<1<0" a un array de números [1, 1, 1, 0]
            const scores = eat[index].split("<").map(Number);
            const totalScore = scores.reduce((sum, num) => sum + num, 0);

            acc[player] = totalScore;
            return acc;
        }, {});

        return { error: undefined, data: playerScores };
    } catch (error) {
        console.error("Error al obtener las puntuaciones:", error);
        return { error: "Error al obtener las puntuaciones", data: undefined };
    }
}
