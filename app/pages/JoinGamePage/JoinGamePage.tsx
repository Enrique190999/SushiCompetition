import React, { useRef, useState, useEffect } from 'react';
import './JoinGamePage.css';
import ButtonComponent from '~/components/ButtonComponent';
import { JoinNumberComponent } from '~/components/JoinNumberComponent/JoinNumberComponent';
import SpinnerComponent from '~/components/SpinnerComponent';
import ModalComponent from '~/components/ModalComponent';
import { checkGameExists } from '~/api/Functions/checkGame';
import { joinToGame } from '~/api/Functions/joinToGame';
import { useNavigate } from 'react-router';
import TextBoxComponent  from '~/components/TextBoxComponent';

type Props = {};

export const JoinGamePage = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState<React.ReactNode>(null);
    const [showClose, setShowClose] = useState(true);
    const navigate = useNavigate();
    const textBoxRef = useRef<HTMLInputElement>(null);

    const checkGame = async () => {
        try {
            setIsLoading(true);
            const data = await checkGameExists(code);
            console.log(data);

            if (data && data.error) {
                setContent(<p>No existe el juego</p>);
                setShowClose(true);
                setShowModal(true);
                return;
            }

            // ✅ Ahora capturamos correctamente el username antes de unirse
            const joinGameCompTSX = async () => {
                const inputValue = textBoxRef.current?.value || "";
                console.log("Usuario introducido:", inputValue);
                setUsername(inputValue);

                // Esperar a que el estado se actualice correctamente
                const finalUsername = inputValue.toUpperCase();

                const resJoin = await joinToGame(code, finalUsername);
                console.log(resJoin);

                if (resJoin && resJoin.error) {
                    setContent(<p>Ha habido un error con la partida, intentalo más tarde</p>);
                    setShowClose(true);
                    setShowModal(true);
                    return;
                }

                if (resJoin && resJoin.message) {
                    navigate(`/game/${code}/${finalUsername}`);
                }
            };

            if (data && data.message) {
                console.log(data, 'estoy en existe');
                setShowClose(false);
                setContent(
                    <div>
                        <p>Introduce nombre para unirte</p>
                        {/* ✅ Ahora TextBoxComponent recibe el ref correctamente */}
                        <TextBoxComponent ref={textBoxRef} />
                        <ButtonComponent
                            handlerClick={joinGameCompTSX}
                            style={{ border: '1px solid #000' }}
                            href="#"
                            type="button"
                            text="UNIRSE A LA PARTIDA"
                        />
                    </div>
                );
                setShowModal(true);
            }
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="parent-joingame">
            <h1>Unirse a partida</h1>
            <JoinNumberComponent value={code} onChange={setCode} />
            <SpinnerComponent isLoading={isLoading} />
            <ButtonComponent handlerClick={() => checkGame()} text="Unirse a partida" type="button" href="#" />
            <ModalComponent showClose={showClose} isOpen={showModal} onClose={() => setShowModal(false)} message={content} />
        </div>
    );
};
