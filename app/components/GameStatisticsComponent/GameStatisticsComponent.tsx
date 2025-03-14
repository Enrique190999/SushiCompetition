import React, { useState, useEffect } from 'react';
import './GameStatisticsComponent.css';

type Props = {
    idGame: string;
};

type PlayerStats = {
    name: string;
    totalPoints: number;
};

export const GameStatisticsComponent = ({ idGame }: Props) => {
    // Estado para almacenar los datos de los jugadores
    const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

    // Simulación de datos hasta que conectes con Firestore
    useEffect(() => {
        // Aquí luego llamaremos la función que obtenga los datos de Firestore
        // Ahora solo es una simulación
        const fetchData = async () => {
            const sampleData: PlayerStats[] = [
                { name: "KIKE", totalPoints: 14 },
                { name: "MARCOS", totalPoints: 10 },
                { name: "ADRIA", totalPoints: 5 },
                { name: "TUPUTAMADRE", totalPoints: 4 }
            ];
            setPlayerStats(sampleData.sort((a, b) => b.totalPoints - a.totalPoints)); // Ordenar de mayor a menor
        };

        fetchData();
    }, [idGame]);

    return (
        <div className="statistics-container">
            <h2>Estadísticas del Juego</h2>
            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Jugador</th>
                        <th>Puntos Totales</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats.map((player, index) => (
                        <tr key={player.name} className={index === 0 ? "winner" : index === playerStats.length - 1 ? "loser" : ""}>
                            <td>{index + 1}</td>
                            <td>{player.name}</td>
                            <td>{player.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
