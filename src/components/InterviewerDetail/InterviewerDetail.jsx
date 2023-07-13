import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../App.css";
import { hostURL } from "../../config";
import { capitalFirstLetter } from "../../js/string";

export default function InterviewerDetail() {
    const [interviewer_details, setInterviewer_details] = useState(null);

    const RID = useParams().RID || '64a792fae3a86cdad7522bd6';

    const url = hostURL;

    useEffect(() => {
        fetch(url + `/recruiter/${RID}`)
            .then(res => res.json())
            .then(data => {
                // setdata(data);
                const interviewer_data = [
                    {
                        label: "Full Name",
                        value: data.info.name
                    },
                    {
                        label: "Contact Number",
                        value: data.info.phone
                    },
                    {
                        label: "Email",
                        value: data.info.email
                    },
                    {
                        label: "Pastoral Team",
                        value: `${capitalFirstLetter(data.info.pastoral_team[0])}, ${capitalFirstLetter(data.info.pastoral_team[1])}`
                    },
                    {
                        label: "Selected Ministry",
                        value: capitalFirstLetter(data.info.ministry[2])
                    },
                    {
                        label: "Interview Time",
                        value: `${new Date(data.appointment.ministry.appointment_time * 1000).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })} 
                                ${new Date(data.appointment.ministry.appointment_time * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`
                    }
                ];
                setInterviewer_details(interviewer_data);
            })
    }, []);

    return (
        <div className="flex flex-col justify-between milestone-container align-center">
            <div>
                <h3 className="milestone-h3">
                    Interviewer Details
                </h3>

                {interviewer_details && (
                    <div className="flex flex-col" style={{ marginBottom: "60px" }}>
                        {
                            interviewer_details.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="input-text">{item.label}</div>
                                        <div className="div-text">{item.value}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
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
