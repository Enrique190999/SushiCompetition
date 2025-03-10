import React, { use } from 'react'
import './JoinGamePage.css'
import ButtonComponent from '~/components/ButtonComponent'
import { JoinNumberComponent } from '~/components/JonNumberComponent/JoinNumberComponent'
import SpinnerComponent from '~/components/SpinnerComponent'
import ModalComponent from '~/components/ModalComponent'
import { checkGameExists } from '~/api/Functions/checkGame'
import TextBoxComponent from '~/components/TextBoxComponent'
import { joinToGame } from '~/api/Functions/joinToGame'
import { useNavigate } from 'react-router'
type Props = {}

export const JoinGamePage = (props: Props) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [code, setCode] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [showModal, setShowModal] = React.useState(false)
    const [content, setContent] = React.useState<React.ReactNode>(null)
    const [showClose, setShowClose] = React.useState(true)
    const navigate = useNavigate();

    const checkGame = async () => {
        try {
            setIsLoading(true)
            const data = await checkGameExists(code)
            console.log(data)
            if (data && data.error) {
                setContent(<p>No existe el juego</p>)
                setShowClose(true)
                setShowModal(true)
            }
            const joinGameCompTSX = async () => {
                console.log("estoy en joinGameCompTSX")
                const resJoin = await joinToGame(code, username)
                console.log(resJoin)
                if (resJoin && resJoin.error) {
                    setContent(<p>Ha habido un error con la partida, intentalo mas tarde</p>)
                    setShowClose(true)
                    setShowModal(true)
                    return
                }

                if(resJoin && resJoin.message) {
                    navigate(`/game/${code}/${username}`)
                }

            }

            if (data && data.message) {
                console.log(data,'estoy en existe')
                setShowClose(false)
                setContent(
                    <div>
                        <p>Introduce nombre para unirte</p>
                        <TextBoxComponent onChange={(e) => setUsername(e.target.value)} />
                        <ButtonComponent handlerClick={() => joinGameCompTSX()} style={{'border':'1px solid #000'}} href='#' type='button' text='UNIRSE A LA PARTIDA'/>
                    </div>
                )
                setShowModal(true)
            }
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='parent-joingame'>
            <h1>Unirse a partida</h1>
            <JoinNumberComponent value={code} onChange={setCode} />
            <SpinnerComponent isLoading={isLoading} />
            <ButtonComponent handlerClick={() => checkGame()} text='Unirse a partida' type='button' href='#' />
            <ModalComponent showClose={showClose} isOpen={showModal} onClose={() => setShowModal(false)} message={content} />
        </div>
    )
}