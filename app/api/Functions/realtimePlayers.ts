import { db } from "../Firestore/initializeapp";
import { onSnapshot, doc } from "firebase/firestore";

export function realtimePlayers(gameId: string, callback: (players: string[]) => void) {
    const gameRef = doc(db, "games", gameId);

    return onSnapshot(gameRef, (snapshot) => {
        if (snapshot.exists()) {
            const gameData = snapshot.data();
            const players = gameData.players || [];
            callback(players);
        } else {
            console.error("El documento de la partida no existe.");
            callback([]);
        }
    });
}
