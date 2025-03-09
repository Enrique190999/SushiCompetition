import React from 'react'
import './CreateGamePage.css'
import ButtonComponent from '~/components/ButtonComponent'
import TextBoxComponent from '~/components/TextBoxComponent'
type Props = {}

export const CreateGamePage = ({ gameId }: { gameId?: string }) => {
  const [players, setPlayers] = React.useState<string[]>([])
  const addPlayer = (player: string) => { setPlayers([...players, player]) }
  const [playerName, setPlayerName] = React.useState('')

  const startGame = () => {
    if (playerName.length < 0){
      
    }
  }

  return (
    <div className='parent-creategame'>
      <h1>Código de partida</h1>
      <p className='codegame'>{gameId}</p>
      <h2>Jugadores</h2>
      <p className='namegame'>Nombre del jugador</p>
      <TextBoxComponent onChange={(e) => setPlayerName(e.target.value)} placeholder='Nombre'></TextBoxComponent>
      <div className='players-container'>
        <p>Paco</p>
        <p>Manolo</p>
      </div>
      <ButtonComponent text='Iniciar partida' href='#' type='button' />
    </div>
  )
}