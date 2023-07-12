import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../App.css";
import "./milestone.css"
import { hostURL } from "../../config.js";
import Timeline from "../Timeline/Timeline";
import { getTimeStamp } from "../../js/dateTime";

export default function Milestone() {
    const [userDatas, setUserDatas] = useState(null);
    const [events, setEvents] = useState(null);

    const RID = useParams().RID || '64a792fae3a86cdad7522bd6';

    const url = hostURL;

    useEffect(() => {
        fetch(url + `/recruiter/${RID}`)
            .then(res => res.json())
            .then(data => {
                setUserDatas(data);
                const get_events = [{
                    title: "Application Submitted",
                    date: data.application.updated,
                },
                {
                    title: "Pre-screening Passed",
                    date: data.pre_screening.pre_screening_time,
                },
                {
                    title: "Interview Appointment Submitted",
                    date: data.appointment && data.appointment.ministry && data.appointment.ministry.created ?
                        data.appointment.ministry.created : null,
                },
                {
                    title: "Interview",
                    date: data.appointment && data.appointment.ministry && data.appointment.ministry.appointment_time ?
                        data.appointment.ministry.appointment_time : null,
                },
                    // {
                    //     title: "Offer Letter Received",
                    //     date: data.application.status === "pass" ? data.application.updated : null,
                    // },
                    // {
                    //     title: "Orientation",
                    //     date: data.application.status === "pass" ? 1690646400 : null,
                    // }
                ]
                setEvents(get_events);
            });
    }, []);

    function handleIconClick(link) {
        window.open(link, "_blank")
    }

    return (
        <section className="flex flex-col justify-between milestone-container align-center">
            <div>
                <h3 className="milestone-h3">
                    Milestone
                </h3>

                <div>
                    {/* <h4 className="milestone-h4 ">Your Serve Journey</h4> */}
                    {userDatas && <Timeline events={events} />}
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
        </section >
    )
}
