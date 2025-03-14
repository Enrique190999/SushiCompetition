import React, { useEffect, useState } from 'react'
import './InGamePage.css'
import SushiClickerComponent from '~/components/SushiClickerComponent'
import ButtonComponent from '~/components/ButtonComponent'
import ModalComponent from '~/components/ModalComponent'
import { listenerWaitingStartGame } from '~/api/Functions/listenerWaitingStartGame'
import { checkRolPlayer } from '~/api/Functions/checkRolPlayer'

type Props = {
    gameId: string
    username: string
}

export const InGamePage = (props: Props) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isAdminPlayer, setIsAdminPlayer] = useState(false)
    const [gameStatus, setGameStatus] = useState<string | null>(null)

    const { gameId, username } = props

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
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [gameId, username]);

    const content = (
        <div>
            <p>La partida no ha comenzado aún, espera a que el administrador la inicie...</p>
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
            {isAdminPlayer && (
                <ButtonComponent href='#' type='button' text='TERMINAR PARTIDA' />
            )}

            <ButtonComponent href='#' type='button' text='VER ESTADISTICAS' />

            <ModalComponent message={content} showClose={false} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
