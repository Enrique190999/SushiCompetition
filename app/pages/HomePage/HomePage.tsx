import React, { useState } from 'react';
import './HomePage.css';
import ButtonComponent from '~/components/ButtonComponent';
import SpinnerComponent from '~/components/SpinnerComponent';
type Props = {};

export const HomePage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
   <div className='parent-homepage'>
    <img className='logo' src='./logo.png'></img>
    <p>Powered by kikedev</p>
    <ButtonComponent type='button' href={'/create'} text='CREAR PARTIDA'/>
    <ButtonComponent type='button' href={'/login'} text='UNIRSE A PARTIDA'/>
    <SpinnerComponent isLoading={isLoading} />
   </div>
  );
};
