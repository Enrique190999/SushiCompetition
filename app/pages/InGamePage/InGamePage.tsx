import React from 'react'
import './InGamePage.css'
import SushiClickerComponent from '~/components/SushiClickerComponent'
import ButtonComponent from '~/components/ButtonComponent'

type Props = {
    gameId: string
    username: string
}

export const InGamePage = (props: Props) => {
    return (
        <div className="parent-ingame">
            <div className='parent-clickers'>
                <SushiClickerComponent type='nigiri' />
                <SushiClickerComponent type='maki' />
                <SushiClickerComponent type='gyoza' />
                <SushiClickerComponent type='fried' />
            </div>
            <ButtonComponent  href='#' type='button' text='TERMINAR PARTIDA'/>  
        </div>
    )
}