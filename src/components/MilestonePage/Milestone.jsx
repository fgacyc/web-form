import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../App.css";
import "./milestone.css"
import { hostURL } from "../../config.js";
import Timeline from "../Timeline/Timeline";
import { postReq } from "../../js/requests";

export default function Milestone() {
    const [userDatas, setUserDatas] = useState(null);
    const [events, setEvents] = useState(null);
    const [qrCode, setQrCode] = useState(null);

    const RID = useParams().RID || '64a792fae3a86cdad7522bd6';

    const url = hostURL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url + `/recruiter/${RID}`);
                const data = await response.json();
                setUserDatas(data);
                const get_events = [
                    {
                        title: "Application Submitted",
                        date: data.application.updated,
                    },
                    {
                        title: "Pre-screening Passed",
                        date: data.pre_screening.pre_screening_time,
                    },
                    {
                        title: "Interview Appointment Submitted",
                        date: data.appointment && data.appointment.ministry && data.appointment.ministry.created
                            ? data.appointment.ministry.created
                            : null,
                    },
                    {
                        title: "Interview",
                        date: data.appointment && data.appointment.ministry && data.appointment.ministry.appointment_time
                            ? data.appointment.ministry.appointment_time
                            : null,
                    },
                ];
                setEvents(get_events);

                if (!qrCode) {
                    const postData = {
                        url: `https://serve.fgacyc.com/recruiter/${RID}`,
                    };
                    const qrcode = await postReq(`/qrcode/${RID}`, postData);
                    if (qrcode.status === "success") {
                        setQrCode(qrcode.data.imageUrl);
                    }
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        alert("Please take a screenshot of your QR code and show it to the interviewer during your interview.");
    }, []);


    function handleIconClick(link) {
        window.open(link, "_blank")
    }

    return (
        <div className="flex flex-col justify-between milestone-container align-center">
            <div>
                <h3 className="milestone-h3">
                    Milestone
                </h3>

                <div>
                    {/* <h4 className="milestone-h4 ">Your Serve Journey</h4> */}
                    {userDatas && <Timeline events={events} />}
                </div>
                <div className="qrCode-con">
                    {qrCode && (
                        <img className="qrCode-container" src={qrCode} alt="QR Code" />
                    )}
                </div>

            </div >
            <div className="flex flex-col align-center icons-box">
                <div className="fga-div">FGACYC</div>
                <div className="flex">
                    <img src="/icons/fb.svg" alt="Facebook Icon" className="icons"
                        onClick={() => handleIconClick("https://www.facebook.com/FGACYC")} />
                    <img src="/icons/ytb.svg" alt="YouTube Icon" className="icons"
                        onClick={() => handleIconClick("https://www.youtube.com/@fgacyc")} />
                    <img src="/icons/ins.svg" alt="Instagram Icon" className="icons"
                        onClick={() => handleIconClick("https://www.instagram.com/fgacyc/")} />
                    <img src="/icons/threads.svg" alt="Threads Icon"
                        onClick={() => handleIconClick("https://www.threads.net/@fgacyc")} />
                </div>
            </div>
        </div >
    )
}
