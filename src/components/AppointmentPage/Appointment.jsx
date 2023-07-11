import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./appointment.css"
import { hostURL } from "../../config.js";
import { Button as ArcoButton } from '@arco-design/mobile-react';
import { DatePicker, Button, Cell } from '@arco-design/mobile-react';
// import { getTimeStamp, getDateTimeStamp } from "../../tools/dateTime";

export default function Appointment() {
    const [userDatas, setUserDatas] = useState(null);
    const [appoinmentTime, setAppoinmentTime] = useState(null);

    const [picker1Visible, setPicker1Visible] = useState(true);
    const [picker1Value, setPicker1Value] = useState(new Date('2020-02-21 10:10:08'.replace(/-/g, "/")).getTime());

    console.log(picker1Value);

    const RID = useParams().RID || '64a792fae3a86cdad7522bd6';

    const url = hostURL;

    const style = {
        width: 220,
        marginLeft: 10,
    };

    useEffect(() => {
        fetch(url + `/recruiter/${RID}`)
            .then(res => res.json())
            .then(data => {
                setUserDatas(data);
                console.log(data);
            });
    }, [])

    function onChange(dateString, date, ministry) {
        // if (ministry === "ministry1") {
        //     setAppoinmentTime1(getDateTimeStamp(dateString));
        // } else if (ministry === "ministry2") {
        //     setAppoinmentTime2(getDateTimeStamp(dateString));
        // }
    }

    async function putAppointment() {
        // const router = "/appointment"
        // const data = {
        //     "timestamp": getTimeStamp(),
        //     "ministry1": {
        //         "appointment": {
        //             "status": true,
        //             "appointment_time": appoinmentTime1
        //         },
        //         "interviewers": [],
        //         "questions": {}
        //     },
        //     "ministry2": {
        //         "appointment": {
        //             "status": false,
        //             "timestamp": appoinmentTime2 ? appoinmentTime2 : null
        //         },
        //         "interviewers": [],
        //         "questions": {}
        //     },
        //     "transfer": {
        //         "appointment": {
        //             "status": false,
        //             "timestamp": null
        //         },
        //         "interviewers": [],
        //         "questions": {}
        //     }
        // }
        // console.log(data);
        // let options = {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // }
        // let res = await fetch(url + router + "/" + formId, options)
        // let result = await res.json()

        // if (result.status === "success") {
        //     alert("Appointment successfully set.")
        // } else {
        //     alert("Appointment failed to set. Please try again.")
        // }
    }

    function handleSubmit(e) {
        // e.preventDefault();

        // if (userDatas.info.ministry1.ministry && !appoinmentTime1) {
        //     alert('Please select a date for the interview of your chosen ministry 1.')
        // } else if (userDatas.info.ministry2.ministry && !appoinmentTime2) {
        //     alert('Please select a date for the interview of your chosen ministry 2.')
        // } else {
        //     putAppointment();
        // }
    }

    return (
        <section
            style={{ backgroundColor: '#f5f5f8', padding: "0 35px" }}
            className="flex flex-col justify-between"
        >
            <div>
                <DatePicker
                    visible={picker1Visible}
                    maskClosable
                    disabled={false}
                    minTs={new Date('2020-02-22 18:00:00'.replace(/-/g, "/")).getTime()}
                    currentTs={picker1Value}
                    title="year/month/day/hour/minute/second"
                    onHide={() => {
                        setPicker1Visible(false);
                    }}
                    onChange={(timestamp, obj) => {
                        console.info('---demo on change index', timestamp);
                        setPicker1Value(timestamp);
                    }}
                    touchToStop={true}
                />
            </div>
            <div>
                <div id="submission-container" className='flex' style={{ paddingTop: "25px" }}>
                    <img src="/icons/left.svg" alt="Back Icon" onClick={() => { navigate(-1) }} />
                    <h3 style={{
                        color: "#21416d", fontSize: "1.125rem", fontFamily: "SF Pro Display",
                        fontWeight: "600", marginLeft: "90px"
                    }}>
                        Appointment
                    </h3>
                </div>
                <form action="#" id="submission-form" className="flex flex-col" style={{ marginTop: "10px" }}>

                    <label className="input-text">Name</label>
                    <div className="div-text">Name</div>

                    <label className="input-text">Selected Ministry</label>
                    <div className="div-text">Selected Ministry</div>

                    <label className="input-text">Appointment Date</label>
                    <div className="div-text">Appointment Date</div>

                    {/* {
                userDatas &&
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h3>Ministry 1: {userDatas.info.ministry1.ministry}</h3>
                        <DatePicker
                            showTime
                            disabledDate={(current) => current.isBefore(dayjs())}
                            onSelect={onSelect}
                            onChange={(dateString, date) =>
                                onChange(dateString, date, "ministry1")
                            }
                            style={style}
                        />
                    </div>
                    }
                </div>
            } */}

                </form>
            </div>
            <button
                className="btn-submit"
                style={{ backgroundColor: "#173965", color: "white", marginBottom: "35px" }}
                onClick={handleSubmit}
            >
                Submit
            </button>
        </section>
    )
}