import { db } from "../Firestore/initializeapp";
import { doc, onSnapshot } from "firebase/firestore";

export function listenerWaitingStartGame(gameId: string, callback: (status: string) => void) {
    if (!gameId) return;

    const gameRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(gameRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            const status = data.status || "waiting";

            console.log(`Estado actual del juego ${gameId}:`, status);

            callback(status);
        }
    });

    return unsubscribe;
}

