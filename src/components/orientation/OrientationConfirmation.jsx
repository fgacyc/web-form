import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReq} from "../../js/requests.js";
import * as party from "party-js";


export default function OrientationConfirmation() {
    const { RID } = useParams();
    const [userData, setUserData] = useState(null);

    function Confetti(){
        setInterval(function(){
            let confetti = document.getElementById("confetti");
            party.confetti(confetti, {
                count: party.variation.range(60, 80),
                size: party.variation.range(0.8, 1.2),
            });
        }, 3000);
    }


    useEffect(() => {
        getReq(`/recruiter/${RID}`).then(data => {
            setUserData(data);
        })
        getReq(`/orientation/confirmation/${RID}`).then(data => {
            console.log(data);
            Confetti();
        })
    }, []);




    const textStyle = {
        marginBottom:10
    }

    return (
        <div className="flex flex-col align-center justify-between"
             style={{ backgroundImage: "url('/images/KV_white_bg.png')", padding: "0px 35px", minHeight: "100vh"
        }}
        >
            <h3 style={{
                color: "#21416d", fontSize: "1.125rem", fontFamily: "SF Pro Display",
                fontWeight: "600", marginTop: "60px"
            }}>
                {
                    userData &&
                    <div>
                        <div style={textStyle}>{`Hi, ${userData.info.name}`},</div>
                        <div style={textStyle}>Congratulations!</div>
                        <div style={textStyle}>You passed the interview,</div>
                        <div style={textStyle}>Welcome to {userData.info.ministry[2]} Ministry!</div>
                        <div style={textStyle}>Looking forward to meeting you on Sunday!</div>
                    </div>
                }
            </h3>
            <div style={{fontSize:60}} id="confetti">🎉</div>
            <div></div>
            <div></div>
            <div>
                <h4 className="complete-h4">© 2023 FGACYC.</h4>
                <h4 className="complete-h4" style={{ marginBottom: "45px" }}>All Rights Reserved</h4>
            </div>
        </div>
    )
}