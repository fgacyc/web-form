import '../../App.css'
import './card.css'
import {useState} from "react";
import {updateSelectedDepartment} from "./cardStore.js";
import {findMinistry} from "../../data/organization_structure.js";

// Rating component
const Rating = ({ rateTxt, rate, color }) => {
    const maxRating = 5;
    const filledDots = Math.floor(rate);
    const hasHalfDot = rate % 1 !== 0;

    const renderDots = () => {
        const dots = [];
        for (let i = 1; i <= maxRating; i++) {
            if (i <= filledDots) {
                dots.push(<span key={i} className="filled-dot"
                    style={{ backgroundColor: color, border: `1px solid ${color}` }} />);
            } else if (i === filledDots + 1 && hasHalfDot) {
                dots.push(<span key={i} className="half-dot"
                    style={{ backgroundColor: color, border: `1px solid ${color}` }} />);
            } else {
                dots.push(<span key={i} className="empty-dot" style={{ border: `1px solid ${color}` }} />);
            }
        }
        return dots;
    };

    return (
        <div className="flex align-center mb-5">
            <h6 style={{ color, marginRight: 8, fontFamily: "FZChaoCuHei", fontWeight: "400" }}>{rateTxt}</h6>
            {renderDots()}
        </div>
    );
};

const Card = ({ img, title1, title2, description, rate1, rate2 }) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
        //console.log(title2)
        updateSelectedDepartment(title2, !selected);
        console.log(findMinistry(title2));
    };

    return (
        <div key={title2} className="card relative"
             style={{ backgroundImage: `url(${img})` }}
                onClick={handleClick}
        >
            <div className='overlay' style={{ borderRadius: "30px" }}></div>
            {
                selected ? <img src="/icons/select.svg" alt="Select Icon" id="select-icon" />
                : <img src="/icons/unselect.svg" alt="Unselect Icon" id="select-icon" />
            }
            <div className='flex flex-col justify-end relative' style={{ height: "95%", margin: "0 25px" }}>
                <h4 className="card-h4" style={{ fontFamily: "FZChaoCuHei", fontWeight: "400", color: "white" }}>{title1}</h4>
                <h2 className="card-h2" style={{ fontFamily: "SF Pro Display", fontWeight: "900", fontSize: "2.313rem", color: "white" }}>{title2}</h2>
                {description.map((desc, index) => {
                    return (
                        <p key={index} className="card-p" style={{ fontFamily: "Microsoft JhengHei", color: "white" }}>{desc}</p>
                    )
                })}
                <Rating rateTxt="技术等级" rate={rate1} color="rgba(45, 192, 113)" />
                <Rating rateTxt="委身等级" rate={rate2} color="rgba(217, 217, 217)" />
            </div>
        </div>
    );
};

export default Card;
