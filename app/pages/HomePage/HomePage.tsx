import React, { useState } from 'react';
import './HomePage.css';
import ButtonComponent from '~/components/ButtonComponent';
import SpinnerComponent from '~/components/SpinnerComponent';
import { createAGameFunction } from '~/api/Functions/createAGame';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const createAGame = async () => {
    let code;
    try {
      setIsLoading(true);
      code = await createAGameFunction();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      navigate(`create/${code}`); 
    }
  };
  
  return (
    <div className='parent-homepage'>
      <img className='logo' src='./logo.png' alt="Logo" />
      <p>Powered by kikedev</p>
      <ButtonComponent type='button' href={'#'} handlerClick={createAGame} text='CREAR PARTIDA' />
      <ButtonComponent type='button' href={'/login'} text='UNIRSE A PARTIDA' />
      <SpinnerComponent isLoading={isLoading} />
    </div>
  );
};
