import nigiriImg from '~/assets/nigiri.png';
import makiImg from '~/assets/maki.png';
import gyozaImg from '~/assets/gyoza.png';
import friedImg from '~/assets/fried.png';

type Props = {
    type: 'nigiri' | 'maki' | 'gyoza' | 'fried';
};

export const SushiClickerComponent = (props: Props) => {
    const sushiKind = {
        'nigiri': nigiriImg,
        'maki': makiImg,
        'gyoza': gyozaImg,
        'fried': friedImg
    };

    return <img src={sushiKind[props.type]} alt={props.type} />;
};
