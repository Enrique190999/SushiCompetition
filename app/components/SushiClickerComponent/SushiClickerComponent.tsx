import React, { useState } from "react";
import nigiriImg from "~/assets/nigiri.png";
import makiImg from "~/assets/maki.png";
import gyozaImg from "~/assets/gyoza.png";
import friedImg from "~/assets/fried.png";
import "./SushiClickerComponent.css";

type Props = {
    type: "nigiri" | "maki" | "gyoza" | "fried";
};

export const SushiClickerComponent = ({ type }: Props) => {
    const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
    
    const sushiKind = {
        nigiri: nigiriImg,
        maki: makiImg,
        gyoza: gyozaImg,
        fried: friedImg,
    };

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
            <img style={{ width: "100%" }} src={sushiKind[type]} alt={type} />
            {clicks.map((click) => (
                <span
                    key={click.id}
                    className="click-animation"
                    style={{ left: click.x, top: click.y }}
                >
                    +1
                </span>
            ))}
        </div>
    );
};
