import React from 'react'
import './GameStatisticsPage.css'
import GameStatisticsComponent from '~/components/GameStatisticsComponent'
type Props = {
    idGame:string
}

export const GameStatisticsPage = ({idGame}: Props) => {
  return (
    <GameStatisticsComponent idGame={idGame}/>
  )
}