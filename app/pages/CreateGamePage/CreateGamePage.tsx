import React, { useEffect } from 'react'
import './CreateGamePage.css'
import ButtonComponent from '~/components/ButtonComponent'
import TextBoxComponent from '~/components/TextBoxComponent'
import ModalComponent from '~/components/ModalComponent'
import { realtimePlayers } from '~/api/Functions/realtimePlayers'
import SpinnerComponent from '~/components/SpinnerComponent'
import { useNavigate } from 'react-router'


export const CreateGamePage = ({ gameId }: { gameId?: string }) => {
  const [players, setPlayers] = React.useState<string[]>([])
  const addPlayer = (player: string) => { setPlayers([...players, player]) }
  const [playerName, setPlayerName] = React.useState('')
  const [ShowModal, setShowModal] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!gameId) return
    const suscribePlayers = realtimePlayers(gameId, setPlayers)
    return () => suscribePlayers()
  }, [gameId])

  const startGame = () => {
    try {
      setIsLoading(true);
      if (playerName.trim().length === 0) {
        console.log("estoy nulo")
        setShowModal(true);
        return;
      }
      console.log(`/game/${gameId}/${playerName}`)
      navigate(`/game/${gameId}/${playerName}`);
      
    } catch (error) {
      console.error(error)
    } finally {
      console.log("Juego iniciado con:", playerName);
      setIsLoading(false);
    }

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
      <SpinnerComponent isLoading={isLoading} />
    </div>
  )
}