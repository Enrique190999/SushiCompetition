import React from 'react';
import './HomePage.css';
import ButtonComponent from '~/components/ButtonComponent';
type Props = {};

export const HomePage = (props: Props) => {
  return (
   <div className='parent-homepage'>
    <img className='logo' src='./logo.png'></img>
    <p>Powered by kikedev</p>
    <ButtonComponent text='CREAR PARTIDA'/>
    <ButtonComponent text='UNIRSE A PARTIDA'/>
   </div>
  );
};
