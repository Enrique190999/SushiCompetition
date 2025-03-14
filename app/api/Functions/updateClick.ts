import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { Sushi } from "~/types/global";
import { db } from "../Firestore/initializeapp";

// nigiri < maki < gyoza < fried
function updateDataSushi(textFormmatedStr: string, typeSushi: Sushi) {
    const textFormmated = textFormmatedStr.split("<").map(Number);
    
    if (!Array.isArray(textFormmated) || textFormmated.length !== 4) {
        throw new Error("Formato de datos incorrecto");
    }

    switch (typeSushi) {
        case 'nigiri':
            textFormmated[0]++;
            break;
        case 'maki':
            textFormmated[1]++;
            break;
        case 'gyoza':
            textFormmated[2]++;
            break;
        case 'fried':
            textFormmated[3]++;
            break;
    }

    return textFormmated.join("<"); // Convertir de nuevo a string
}

export async function updateClickFunction(id: string, player: string, sushiUpdate: Sushi) {
    try {
        const gameRef = doc(db, "games", id);
        const gameSnapshot = await getDoc(gameRef);

        if (!gameSnapshot.exists()) {
            return { error: "El juego no existe", message: undefined };
        }

        const gameData = gameSnapshot.data();
        const admin = gameData.admin?.toUpperCase(); // Convertimos el nombre del admin a mayúsculas
        const eat = Array.isArray(gameData.eat) ? [...gameData.eat] : [];
        const players = Array.isArray(gameData.players) ? gameData.players.map((p: string) => p.toUpperCase()) : [];
        
        const playerUpper = player.toUpperCase(); // Convertir el nombre del jugador a mayúsculas
        const isAdmin = admin === playerUpper;

        // Si el jugador es el administrador, actualiza el último de la lista de `eat`
        let indexPlayer = isAdmin ? eat.length - 1 : players.findIndex((p: string) => p === playerUpper);

        if (indexPlayer === -1) {
            return { error: "Jugador no encontrado", message: undefined };
        }
        
        // Si no existen datos para este jugador, inicializarlos con "0<0<0<0"
        if (!eat[indexPlayer] || typeof eat[indexPlayer] !== "string") {
            eat[indexPlayer] = "0<0<0<0";
        }

        // Crear una copia segura del array antes de modificarlo
        const updatedEat = [...eat];
        updatedEat[indexPlayer] = updateDataSushi(updatedEat[indexPlayer], sushiUpdate);

        await updateDoc(gameRef, { eat: updatedEat });

        console.log(`Actualizado correctamente - ${sushiUpdate} actualizado para ${isAdmin ? "ADMIN (último índice)" : "Jugador"}`);
        return { error: undefined, message: `${sushiUpdate} actualizados correctamente` };
    } catch (e) {
        console.error('Error al actualizar el click de sushi', e);
        return { error: "Error al actualizar los valores", message: undefined };
    }
}
