import React, { useState } from "react";
import nigiriImg from "~/assets/nigiri.png";
import makiImg from "~/assets/maki.png";
import gyozaImg from "~/assets/gyoza.png";
import friedImg from "~/assets/fried.png";
import "./SushiClickerComponent.css";
import type { Sushi } from "~/types/global";
import SpinnerComponent from "~/components/SpinnerComponent";
import { updateClickFunction } from "~/api/Functions/updateClick";

type props = {
    sushi: Sushi,
    idGame: string,
    player: string,
}

export const SushiClickerComponent = (type: props) => {
    const { sushi, idGame, player } = type;
    const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sushiKind = {
        nigiri: nigiriImg,
        maki: makiImg,
        gyoza: gyozaImg,
        fried: friedImg,
    };
    const updateClick = async (sushiClicked: Sushi) => {
        try {
            setIsLoading(true)
            await updateClickFunction(idGame, player, sushiClicked).catch((err) => console.log("error ERRROR: " + err))
        } catch (err) {
            console.log("NO ACTUALIZA")
            setIsLoading(false)
            console.error("Error al actualizar", err)
        } finally {
            setIsLoading(false)

        }
    }
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;

        // Guardar la posición del click en relación con el contenedor
        const rect = e.currentTarget.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const newClick = { id: Date.now(), x, y };
        setClicks((prev) => [...prev, newClick]);

        // Eliminar el efecto después de 1 segundo
        setTimeout(() => {
            setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
        }, 1000);
    };

    return (
        <div className="sushiclicker" onClick={handleClick}>
            <button onClick={() => updateClick(sushi)} style={{ width: "100%" }}><img src={sushiKind[sushi]} style={{ width: '100%' }} /></button>
            {clicks.map((click) => (
                <span
                    key={click.id}
                    className="click-animation"
                    style={{ left: click.x, top: click.y }}
                >
                    +1
                </span>
            ))}
            <SpinnerComponent isLoading={isLoading} />
        </div>
    );
};
