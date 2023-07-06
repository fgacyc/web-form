import '../../App.css'
import './searchCard.css'
import { useEffect } from 'react';
import {getTeamAndSection} from "../../data/ministry_search_data.js";
import {useNavigate} from "react-router-dom";

const Card = ({ img, title1, title2 }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
    }, []);

    function handleClick(){
        //console.log(title2);
        const {team, section} = getTeamAndSection(title2);
        //console.log(getTeamAndSection(title2));
        navigate(`/team/${team}/${section +1}`);
    }

    return (
        <div className="search-card relative" style={{ backgroundImage: `url(${img})` }} onClick={handleClick}>
            <div className='overlay' style={{ borderRadius: "30px" }}></div>
            <div className='flex flex-col justify-end relative' style={{ height: "95%", margin: "0 15px 15px 20px" }}>
                <h4 style={{ fontFamily: "FZChaoCuHei", fontWeight: "400", fontSize: "0.625rem", color: "white" }}>{title1}</h4>
                <h2 className="search-h2" style={{ fontFamily: "SF Pro Display", fontWeight: "900", fontSize: "1.25rem", color: "white" }}>{title2}</h2>
            </div>
        </div>
    );
};

export default Card;
