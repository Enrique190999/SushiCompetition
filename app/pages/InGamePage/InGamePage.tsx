import React, { useEffect, useState } from 'react'
import './InGamePage.css'
import SushiClickerComponent from '~/components/SushiClickerComponent'
import ButtonComponent from '~/components/ButtonComponent'
import ModalComponent from '~/components/ModalComponent'
import GameStatisticsComponent from '~/components/GameStatisticsComponent'
import { listenerWaitingStartGame } from '~/api/Functions/listenerWaitingStartGame'
import { checkRolPlayer } from '~/api/Functions/checkRolPlayer'
import { endGame } from '~/api/Functions/endGame'
import { useNavigate } from 'react-router'

type Props = {
    gameId: string
    username: string
}

export const InGamePage = (props: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isAdminPlayer, setIsAdminPlayer] = useState(false);
    const [gameStatus, setGameStatus] = useState<string | null>(null);
    const [showStatistics, setShowStatistics] = useState(false); // Nuevo estado para estadísticas
    const navigate = useNavigate();
    const { gameId, username } = props;

    const finishGame = async () => {
        try {
            await endGame(gameId);
            navigate(`/ranking/${gameId}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!gameId) return;

        // Verifica si el jugador es administrador
        const fetchPlayerRole = async () => {
            const role = await checkRolPlayer(gameId, username);
            setIsAdminPlayer(role === 'admin');
        };

        fetchPlayerRole();

        // Listener para el estado del juego
        const unsubscribe = listenerWaitingStartGame(gameId, (newStatus) => {
            setGameStatus(newStatus);
            if (newStatus === "playing") {
                setIsOpen(false);
            }

            if (newStatus === "finish") {
                navigate(`/ranking/${gameId}`);
            }
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [gameId, username]);

    const toggleStatistics = () => {
        setIsOpen(true)
        setShowStatistics(true); // Activar la vista de estadísticas en el modal
    };

    const content = (
        <div>
            {!showStatistics ? <p>La partida no ha comenzado aún, espera a que el administrador la inicie...</p> : ''}
            {showStatistics && <GameStatisticsComponent idGame={gameId} />}
        </div>
    );

    return (
        <div className="parent-ingame">
            <div className='parent-clickers'>
                <SushiClickerComponent sushi='nigiri' idGame={gameId} player={username} />
                <SushiClickerComponent sushi='maki' idGame={gameId} player={username} />
                <SushiClickerComponent sushi='gyoza' idGame={gameId} player={username} />
                <SushiClickerComponent sushi='fried' idGame={gameId} player={username} />
            </div>

            {/* Mostrar botón solo si el jugador es administrador */}
            
                <ButtonComponent href="#" handlerClick={finishGame} type='button' text='TERMINAR PARTIDA' />
            

            <ButtonComponent href="#" handlerClick={toggleStatistics} type='button' text='VER ESTADISTICAS' />

            <ModalComponent message={content} showClose={showStatistics} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
