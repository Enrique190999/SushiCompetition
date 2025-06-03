import React, { useEffect, useState } from 'react';
import './GameStatisticsComponent.css';
import { getPlayerScores } from '../../api/Functions/getRanking';

type Props = {
  idGame: string;
};

type PlayerStats = {
  name: string;
  totalPoints: number;
};

export const GameStatisticsComponent = ({ idGame }: Props) => {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await getPlayerScores(idGame);

      if (error) {
        setError(error);
        return;
      }

      const entries = Object.entries(data || {}) as [string, number][];
      const stats: PlayerStats[] = entries.map(([name, totalPoints]) => ({
        name,
        totalPoints
      }));

      setPlayerStats(stats.sort((a, b) => b.totalPoints - a.totalPoints));
    };

    fetchStats();
  }, [idGame]);

  return (
    <div className="statistics-container">
      <h2>Estadísticas del Juego</h2>

      {error ? (
        <p className="error">{error}</p>
      ) : (
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
              <tr
                key={player.name}
                className={
                  index === 0
                    ? 'winner'
                    : index === playerStats.length - 1
                    ? 'loser'
                    : ''
                }
              >
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
