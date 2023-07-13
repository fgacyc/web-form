import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./appointment.css"
import { hostURL } from "../../config.js";
import { capitalFirstLetter } from "../../js/string";
import { postReq } from "../../js/requests";
import { generalQuestions } from "./generalQuestions";

function MusicButton({ content, color, link }) {
    function handleAudio(link) {
        window.open(link, "_blank");
    };

    return (
        <div className="flex align-center justify-between mt-10">
            <label className="input-text mt-0">{content}</label>
            <button className="btn-audio" style={{ backgroundColor: color }}
                onClick={() => { handleAudio(link) }}>Play</button>
        </div>
    )
}

function DanceInfo() {
    return (
        <>
            <p className="appointment-p mt-30">
                ✨AUDITION RULES:-✨<br /><br /><br />
                1. Please pick a song from below and prepare a dance showcase (can be own choreography or dance cover) 🦖<br /><br />
                - 7/11  (Beyoncé) - 0:22 to 0:51<br /><br />
                - I like that (Houston ft. Chinggy, Nate Dog & I-20) - 1:12 to 1:48<br /><br />
                - One & Only (Planetboom)- 1:30 to 2:00<br /><br /><br />

                2. There will be a freestyle section too (song will be played randomly, you will just need to enjoy & show us what you have✨) !<br /><br /><br />

                3. Kindly choose 1 of the interview date & time from below: 👇<br /><br />
                - 22/07/2023 (Saturday) - 12pm & 7:30pm<br /><br />
                - 23/07/2023 (Sunday) - 4pm<br /><br /><br />

                4. Selected one will be announced by the end of July! 📢<br /><br />
            </p>
            <hr />
            <p className="appointment-p">
                ✨面试规则：-✨<br /><br /><br />

                1. 请选择以下一首歌准备舞蹈呈现 （舞蹈可以是原创编舞 或翻跳) 🦖<br /><br />
                - 7/11  (Beyoncé) - 0:22 to 0:51<br /><br />
                - I like that (Houston ft. Chinggy, Nate Dog & I-20) - 1:12 to 1:48<br /><br />
                - One & Only (Planetboom)- 1:30 to 2:00<br /><br /><br />

                2. 我们也会有freestyle环节喔！(歌曲会随机播放,你只需享受）😉<br /><br /><br />

                3. 请选择以下的一个面试日期和时间：-<br /><br />
                - 22/07/2023 (星期六) - 12pm & 7:30pm<br /><br />
                - 23/07/2023 (星期日) - 4pm<br /><br /><br />

                4.入选者将会在7月尾收到通知! 📣
            </p>
            <hr />
            <div className="flex flex-col">
                <MusicButton
                    content={"Music 1: 7/11"}
                    color={"#336397"}
                    link={"https://firebasestorage.googleapis.com/v0/b/cyc-ents.appspot.com/o/recruitment%2Fmusic%2FBeyonce%CC%81%20-%20711.mp4?alt=media&token=da68ec23-51e7-4c21-b979-8213c1eed8fc"}
                />
                <MusicButton
                    content={"Music 2: I Like That"}
                    color={"#00BB9E"}
                    link={"https://firebasestorage.googleapis.com/v0/b/cyc-ents.appspot.com/o/recruitment%2Fmusic%2FHouston%20-%20I%20Like%20That.mp4?alt=media&token=2c833013-eb65-48c7-9f54-7a6aa29d1e0e"}
                />
                <MusicButton
                    content={"Music 3: One & Only"}
                    color={"#E46E48"}
                    link={"https://firebasestorage.googleapis.com/v0/b/cyc-ents.appspot.com/o/recruitment%2Fmusic%2FOne%20And%20Only.mp4?alt=media&token=25dda039-777e-4257-b424-c527c3a4b21a"}
                />
            </div><br />
            <hr />
        </>
    )
}

function VocalInfo() {
    return (
        <p className="appointment-p mt-30 mb-0">
            For P&W vocal, prepare one upbeat & one slow worship song for audition, kindly prepare your own lyrics on phone / memorise the lyrics. <br /><br /><br />

            Songs you can select as below:<br /><br />
            快歌 Upbeat<br /><br />
            1. 坚定信靠 (FGA Worship)<br /><br />
            2. So So Good To Me (FGA Worship)<br /><br />
            3. 本伟大 Perkasa (GMS Live)<br /><br />
            4. 喜乐欢笑 Tertawa (GMS Live)<br /><br />
            5. Wake (Hillsong)<br /><br />
            6. 或自选<br /><br /><br />

            慢敬拜 Worship<br /><br />
            1. 阿爸父 Abba Father (FGA Worship)<br /><br />
            2. 此刻运行 Mengalirlah S’karang (GMS Live)<br /><br />
            3. Goodness of God (Bethel) （中英皆可）<br /><br />
            4. 或自选<br /><br />
        </p>
    )
}

export default function Appointment() {
    const navigate = useNavigate();

    const [userDatas, setUserDatas] = useState(null);
    const [song, setSong] = useState("");
    const [instrument, setInstrument] = useState("");
    const [others, setOthers] = useState("");
    const [formData, setFormData] = useState([]);

    // const RID = useParams().RID || '64a792fae3a86cdad7522bd6';
    const RID = useParams().RID || '64a792fae3a86cdad7522bd7';
    // const RID = useParams().RID || '64a792fae3a86cdad7522bde';
    const date = useParams().date || 1689228232;

    const url = hostURL;

    useEffect(() => {
        fetch(url + `/recruiter/${RID}`)
            .then(res => res.json())
            .then(data => {
                setUserDatas(data);
            });
    }, []);

    function handleSong(e) {
        setSong(e.target.value);
    }

    function handleInstrument(e) {
        setInstrument(e.target.value);
    }

    function handleOthers(e) {
        setOthers(e.target.value);
    }

    async function createAppointment() {
        let appointment = {
            appointment_time: parseInt(date),
        }

        console.log(appointment);
        let data = await postReq(`/appointment/${RID}`, appointment);
        navigate(`/milestone/${RID}`);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const inputs = Array.from(document.querySelectorAll('.submission-form textarea, .submission-form select'));
        const newFormData = inputs.map((input, index) => ({
            type: index === 5 ? userDatas.info.ministry[2] : "general",
            question: generalQuestions[index] || (userDatas.info.ministry[2] === "dance" ? "Pick a Song" : "Pick an Instrument"),
            candidate: input.value === "others" ? others : input.value,
            interviewer: null,
        }));

        if (instrument === "others" && others === "") {
            alert('Please specific your instrument.');
            return;
        }


        const hasEmptyField = newFormData.some(data => data.candidate.trim() === '');
        if (hasEmptyField) {
            alert('Please answer all the general questions.');
            return;
        }

        // console.log(newFormData);
        postReq(`/interview/answers/candidate/${RID}`, {"answers":newFormData}).then(res => {
            if(res.status ==="failed"){
                alert("You have already submitted your answers");
            }
        })

        // console.log(newFormData);
        setFormData(newFormData);
        createAppointment();
    }

    return (
        <div
            className="flex flex-col justify-between appointment-container align-center"
        >
            <div>
                <h3 className="appointment-h3">
                    Appointment
                </h3>

                {
                    userDatas && userDatas.info.ministry[2] === "dance" && <DanceInfo />
                }

                {
                    userDatas && userDatas.info.ministry[2] === "vocal" && <VocalInfo />
                }

                {
                    userDatas && (
                        <div className="flex flex-col">
                            <label className="input-text">Name</label>
                            <div className="div-text">{userDatas.info.name}</div>

                            <label className="input-text">Selected Ministry</label>
                            <div className="div-text">{capitalFirstLetter(userDatas.info.ministry[2])}</div>

                            <label className="input-text">Appointment Date</label>
                            <div className="div-text">{`${new Date(parseInt(date) * 1000).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })} 
                            ${new Date(parseInt(date) * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`}</div>
                        </div>

                    )
                }

                <h3 className="appointment-h3">
                    General Questions
                </h3>

                <form action="#" className="flex flex-col submission-form">
                    {
                        generalQuestions.map((question, index) => {
                            return (
                                <div key={index} className="flex flex-col">
                                    <label className="input-text">{question}</label>
                                    <textarea
                                        className="div-text"
                                        cols="30"
                                        rows="5"
                                        name={`answer-${index}`}>
                                    </textarea>
                                </div>
                            )
                        })
                    }

                    {
                        userDatas && userDatas.info.ministry[2] === "dance" && (
                            <div key={5} className="flex flex-col">
                                <label className="input-text">Pick a song</label>
                                <select
                                    className="appointment-select"
                                    value={song}
                                    name={`answer-5`}
                                    onChange={(e) => { handleSong(e) }}
                                >
                                    <option value="" disabled hidden>Select a song</option>
                                    <option value="7/11">7/11  (Beyoncé)</option>
                                    <option value="I like that">I like that (Houston ft. Chinggy, Nate Dog & I-20)</option>
                                    <option value="One & Only">One & Only (Planetboom)</option>
                                </select>
                            </div>
                        )
                    }

                    {
                        userDatas && userDatas.info.ministry[2] === "vocal" && (
                            <div key={5} className="flex flex-col">
                                <label className="input-text">Pick an instrument</label>
                                <select
                                    className="appointment-select"
                                    value={instrument}
                                    name={`answer-5`}
                                    onChange={(e) => { handleInstrument(e) }}
                                >
                                    <option value="" disabled hidden>Select an instrument</option>
                                    <option value="Bass">Bass</option>
                                    <option value="Drum">Drum</option>
                                    <option value="Keyboard">Keyboard</option>
                                    <option value="Guitar">Guitar</option>
                                    <option value="others">Others</option>
                                </select>
                                {instrument === 'others' && (
                                    <input
                                        style={{width: "100"}}
                                        type="text"
                                        onChange={(e) => {handleOthers(e)}}
                                        placeholder="Specify your instrument"
                                    />
                                )}
                            </div>
                        )
                    }
                </form>
            </div >
            <button
                className="btn-submit"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div >
    )
}
