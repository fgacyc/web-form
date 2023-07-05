import '../../App.css'
import './searchCard.css'
import { useEffect } from 'react';

const Card = ({ img, title1, title2 }) => {
    useEffect(() => {
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="search-card relative" style={{ backgroundImage: `url(${img})` }}>
            <div className='overlay' style={{ borderRadius: "30px" }}></div>
            <div className='flex flex-col justify-end relative' style={{ height: "95%", margin: "0 15px 15px 20px" }}>
                <h4 style={{ fontFamily: "FZChaoCuHei", fontWeight: "400", fontSize: "0.625rem", color: "white" }}>{title1}</h4>
                <h2 className="search-h2" style={{ fontFamily: "SF Pro Display", fontWeight: "900", fontSize: "1.25rem", color: "white" }}>{title2}</h2>
            </div>
        </div>
    );
};

export default Card;
