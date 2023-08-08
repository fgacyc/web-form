import './submission.css'
import SelectedMinistry from '../SelectedMinistry/SelectedMinistry'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findPastoralTeam } from "../../data/pastoral_team.js";
import { findMinistry } from "../../data/organization_structure.js";
import { hostURL } from "../../config.js";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { findMinistryNeeds } from "../../data/ministry_needs.js"; // Import css

export default function Submission() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [registerForChild, setRegisterForChild] = useState(false);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [guardian, setGuardian] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pastoralTeam, setPastoralTeam] = useState("");
    const [leader, setLeader] = useState("");
    const [instrument, setInstrument] = useState("");

    const [nameError, setNameError] = useState("");
    const [guardianError, setGuardianError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pastoralTeamError, setPastoralTeamError] = useState("");
    const [leaderError, setLeaderError] = useState("");
    const [selectedMinistry, setSelectedMinistry] = useState(null);
    const [instrumentError, setInstrumentError] = useState("");

    useEffect(() => {
        const selectedMinistry = JSON.parse(localStorage.getItem('cyc-department-selected'));
        if (!selectedMinistry) {
            navigate("/");
            return;
        }
        setSelectedMinistry(selectedMinistry[0]);

        const closeDate = new Date('16 July 2023 18:00:00');
        const currentDate = new Date();
        // const targetTimestamp = 1688826600;
        // const currentTimestamp = Math.floor(Date.now() / 1000);

        if (currentDate > closeDate) {
            setIsButtonDisabled(true);
        }
    }, []);


    const validateField = (field, setFieldError, errorTxt) => {
        const regex = /^[A-Za-z\s]+$/;

        if (field.trim() === "") {
            setFieldError(errorTxt);
            return false;
        }

        if (!regex.test(field)) {
            setFieldError('Field contains alphabet characters only');
            return false;
        }
        setFieldError("");
        return true;
    };

    const validatePhone = () => {
        const phoneRegex = /^\d{6,12}$/; // Regex pattern for 6 - 12-digit phone number

        // console.log(phone)

        if (phone.trim() === "") {
            setPhoneError("Phone number is required");
            return false;
        }

        if (!phone.match(phoneRegex)) {
            setPhoneError("Phone must not contain special characters");
            return false;
        }

        setPhoneError("");
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for email address

        if (email.trim() === "") {
            setEmailError("Email is required");
            return false;
        }

        if (!email.match(emailRegex)) {
            setEmailError("Email must be a valid email address");
            return false;
        }

        setEmailError("");
        return true;
    };

    const validatePastoralTeam = () => {
        if (pastoralTeam.length === 0) {
            setPastoralTeamError("Pastoral team is required");
            return false;
        }
        setPastoralTeamError("");
        return true;
    };

    function pastoralTeamHandler(e) {
        setPastoralTeam(e.target.value)
    }

    async function postRecruiter(info) {
        let url = hostURL + "/recruiter";
        let pastoral_team = info.pastoral_team[0]
        let department = info.ministry[1]
        let needs = findMinistryNeeds(pastoral_team, department);

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        };
        try {
            let response = await fetch(url, options);
            let data = await response.json();

            if (data.status === "failed" && data.error === "email already exist") {
                return "failed";
            }

            if (data.countdown[department] > needs) {
                localStorage.setItem("cyc-countdown-ifOver", "true");
            } else {
                localStorage.setItem("cyc-countdown-ifOver", "false");
            }

            if (data.status === "success") {
                return true;
            }

        } catch (error) {
            // console.log(error);
            return false;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let ifStop = true;

        if (ifStop) {
            alert("Submission is finished. Please wait for the announcement.");
            return;
        }

        if (isButtonDisabled) {
            alert("Submission is not open yet. Please wait for the announcement.");
            return;
        }

        // const ifSubmitted = "false"
        // if (ifSubmitted === "true") {
        //     alert("You have already submitted your application. Please wait for the response.");
        //     return;
        // }

        const isNameValid = validateField(name, setNameError, "Name is required");
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();

        let isPastoralTeamValid = true;
        let isGuardianValid = true;
        let isLeaderValid = true;
        let isInstrumentValid = true;

        if (registerForChild) {
            isGuardianValid = validateField(guardian, setGuardianError, "Guardian is required");
            isLeaderValid = validateField(leader, setLeaderError, "Leader is required");
            isInstrumentValid = validateField(instrument, setInstrumentError, "Instrument is required");
            setPastoralTeam("wonderkids");
            if (selectedMinistry === 'vocal') {
                setInstrument("none");
            }
        } else {
            isPastoralTeamValid = validatePastoralTeam();
        }

        if (isNameValid && isPhoneValid && isEmailValid && isPastoralTeamValid
            && isGuardianValid && isLeaderValid && isInstrumentValid) {
            confirmAlert(options);
        }
    };

    function submitToServer() {
        let pastoralTeamList = findPastoralTeam(pastoralTeam);
        let ministryList = findMinistry(selectedMinistry);

        let info;

        if (registerForChild) {
            info = {
                "name": name,
                "guardian": guardian,
                "phone": phone,
                "email": email,
                "leader": leader,
                "instrument": instrument,
                "pastoral_team": pastoralTeamList,
                "ministry": ministryList
            }
        } else {
            info = {
                "name": name,
                "phone": phone,
                "email": email,
                "pastoral_team": pastoralTeamList,
                "ministry": ministryList
            }
        }

        console.log(info);

        postRecruiter(info).then((result) => {
            if (result === true) {
                navigate("/complete");
                localStorage.setItem("cyc-submission", "true")
            } else if (result === "failed") {
                alert("You have already submitted your application. Please wait for the response.")
                navigate("/");
            } else {
                alert("Something went wrong, Please try again.");
            }
        });
    }

    const options = {
        title: '',
        message: '确认提交？',
        buttons: [
            {
                label: '是',
                onClick: () => submitToServer()
            },
            {
                label: '否',
                // onClick: () => alert('Click No')
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => { },
        afterClose: () => { },
        onClickOutside: () => { },
        onKeypress: () => { },
        onKeypressEscape: () => { },
        overlayClassName: "overlay-custom-class-name"
    };

    return (
        <div className="flex flex-col justify-between submission-container">

            <div>
                <div className='flex submission-back-container'>
                    <img src="/icons/left.svg" alt="Back Icon" onClick={() => { navigate(-1) }} />
                    <h3 className="submission-h3">
                        Submission
                    </h3>
                </div>
                {
                    (selectedMinistry === 'vocal' || selectedMinistry === 'musician') && (
                        <div className='flex align-center'>
                            <input
                                type="checkbox"
                                className='child-checkbox'
                                checked={registerForChild}
                                onChange={() => setRegisterForChild(!registerForChild)}
                            />
                            <div className='child-register'>Registering for child?</div>
                        </div>
                    )
                }
                <form action="#" className="flex flex-col submission-form">
                    <label htmlFor="name" className="input-text">Full Name</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    {nameError && <div className="input-error">{nameError}</div>}

                    {
                        registerForChild && (
                            <>
                                <label htmlFor="guardian" className="input-text">Parent/ Guardian Name</label>
                                <input type="text" name="guardian" id="guardian" value={guardian} onChange={(e) => setGuardian(e.target.value)} />
                                {guardianError && <div className="input-error">{guardianError}</div>}
                            </>
                        )
                    }

                    <label htmlFor="phone" className="input-text">Contact Number</label>
                    <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {phoneError && <div className="input-error">{phoneError}</div>}

                    <label htmlFor="email" className="input-text">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <div className="input-error">{emailError}</div>}

                    {
                        registerForChild ?
                            <>
                                <label htmlFor="leader" className="input-text">Leader</label>
                                <select
                                    className="submission-select"
                                    name="leader"
                                    id="leader"
                                    value={leader}
                                    onChange={(e) => setLeader(e.target.value)}
                                >
                                    <option value="" disabled hidden>Select a leader</option>
                                    <option value="leaderOne">Leader 1</option>
                                    <option value="leaderTwo">Leader 2</option>
                                </select>
                                {leaderError && <div className="input-error">{leaderError}</div>}
                            </>
                            :
                            <>
                                <label htmlFor="pastoral_team" className="input-text">Pastoral Team</label>
                                <select
                                    className="submission-select"
                                    name="pastoral_team"
                                    id="pastoral_team"
                                    value={pastoralTeam}
                                    onChange={pastoralTeamHandler}
                                >
                                    <option value="" disabled hidden>Select a pastoral team</option>
                                    <optgroup label="Wonderkids">
                                        <option value="wonderkids">Wonderkids</option>
                                    </optgroup>
                                    <optgroup label="Young Warrior">
                                        <option value="heart">Heart</option>
                                        <option value="move">Move</option>
                                        <option value="force">Force</option>
                                        <option value="voice">Voice</option>
                                        <option value="mind">Mind</option>
                                    </optgroup>
                                    <optgroup label="General">
                                        <option value="yp_zone">YP Zone</option>
                                        <option value="pro_family">Pro Family</option>
                                        <option value="young_dreamer">Young Dreamer</option>
                                        <option value="joshua_zone">Joshua Zone</option>
                                    </optgroup>
                                    <optgroup label="Others">
                                        <option value="serdang">Serdang</option>
                                        <option value="kepong">Kepong</option>
                                        <option value="usj">USJ</option>
                                        <option value="setapak">Setapak</option>
                                        <option value="sg_long">Sg Long</option>
                                        <option value="seremban">Seremban</option>
                                        <option value="the_blessing">The Blessing</option>
                                        <option value="to_be_confirmed">To Be Confirmed</option>
                                    </optgroup>
                                </select>
                                {pastoralTeamError && <div className="input-error">{pastoralTeamError}</div>}
                            </>
                    }

                    {
                        registerForChild && selectedMinistry === 'musician' && (
                            <>
                                <label htmlFor="instrument" className="input-text">Instrument(s)</label>
                                <input type="text" name="instrument" id="instrument" value={instrument} onChange={(e) => setInstrument(e.target.value)} />
                                {instrumentError && <div className="input-error">{instrumentError}</div>}
                            </>
                        )
                    }
                </form>
            </div>
            <div className='flex flex-col align-center'>
                <h4 className="input-text submission-h4">Your Ministry Selection</h4>
                {selectedMinistry &&
                    <SelectedMinistry ministry={selectedMinistry} />
                }
            </div>
            <button
                className="btn-submit"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}