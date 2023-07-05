import '../../App.css'
import './mainCard.css'
import { useNavigate } from 'react-router-dom';

const Card = ({ img, title1, title2, team }) => {
    const navigate = useNavigate();

    const navigateToTeam = () => {
        navigate(`/team/${team}`)
    }

    return (
        <div className="card relative" style={{ backgroundImage: `url(${img})` }} onClick={navigateToTeam}>
            <div className='overlay' style={{ borderRadius: "30px" }}></div>
            <div className='flex flex-col justify-end relative' style={{ height: "95%", margin: "0 25px" }}>
                <h4 style={{ fontFamily: "FZChaoCuHei", fontWeight: "400", color: "white" }}>{title1}</h4>
                <h2 id="h2-text" style={{ fontFamily: "SF Pro Display", fontWeight: "900", fontSize: "2.313rem", color: "white", marginBottom: "20px" }}>{title2}</h2>
            </div>
        </div>
    );
};

export default Card;
