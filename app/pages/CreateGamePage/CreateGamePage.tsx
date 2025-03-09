import React, { useEffect } from 'react'
import './CreateGamePage.css'
import ButtonComponent from '~/components/ButtonComponent'
import TextBoxComponent from '~/components/TextBoxComponent'
import ModalComponent from '~/components/ModalComponent'
import { realtimePlayers } from '~/api/Functions/realtimePlayers'

export const CreateGamePage = ({ gameId }: { gameId?: string }) => {
  const [players, setPlayers] = React.useState<string[]>([])
  const addPlayer = (player: string) => { setPlayers([...players, player]) }
  const [playerName, setPlayerName] = React.useState('')
  const [ShowModal,setShowModal] = React.useState(false)

  useEffect(() => {
    if (!gameId) return
    const suscribePlayers = realtimePlayers(gameId,setPlayers)
    return () => suscribePlayers()
  }, [gameId])
  const startGame = () => {
    if (playerName.trim().length === 0) {
      setShowModal(true);
      return;
    }

    console.log("Juego iniciado con:", playerName);
  };

  return (
    <div className='parent-creategame'>
      <h1>Código de partida</h1>
      <p className='codegame'>{gameId}</p>
      <h2>Jugadores</h2>
      <p className='namegame'>Nombre del jugador</p>
      <TextBoxComponent onChange={(e) => setPlayerName(e.target.value)} placeholder='Nombre'></TextBoxComponent>
      <div className='players-container'>
        <p>{playerName}</p>
        {players.map((player, index) => <p key={index}>{player}</p>)}
      </div>
      <ButtonComponent handlerClick={() => startGame()} text='Iniciar partida' href='#' type='button' />
      <ModalComponent
        isOpen={ShowModal}
        onClose={() => setShowModal(false)}
        message="Debes introducir un nombre antes de empezar."
      />
    </div>
  )
}