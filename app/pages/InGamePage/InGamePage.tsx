import React, { useEffect } from 'react'
import './InGamePage.css'
import SushiClickerComponent from '~/components/SushiClickerComponent'
import ButtonComponent from '~/components/ButtonComponent'
import ModalComponent from '~/components/ModalComponent'
import { listenerWaitingStartGame } from '~/api/Functions/listenerWaitingStartGame'
import spinner from '~/assets/spinner.svg'

type Props = {
    gameId: string
    username: string
}

export const InGamePage = (props: Props) => {
    const [isOpen, setIsOpen] = React.useState(true)
    const content = (
        <div>
            <p>La partida no ha comenzado aun, espera a que el administrador la inice...</p>
        </div>
    )
    const { gameId, username } = props
    const [gameStatus, setGameStatus] = React.useState<string | null>(null)
    useEffect(() => {
        if (!gameId) return;

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
    }, [gameId]);
    return (
        <div className="parent-ingame">
            <div className='parent-clickers'>
                <SushiClickerComponent type='nigiri' />
                <SushiClickerComponent type='maki' />
                <SushiClickerComponent type='gyoza' />
                <SushiClickerComponent type='fried' />
            </div>
            <ButtonComponent href='#' type='button' text='TERMINAR PARTIDA' />
            <ModalComponent message={content} showClose={false} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}