import './submission.css'
import SelectedMinistry from '../SelectedMinistry/SelectedMinistry'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Submission() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pastoralTeam, setPastoralTeam] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pastoralTeamError, setPastoralTeamError] = useState("");

    const validateName = () => {
        if (name.trim() === "") {
            setNameError("Name is required");
            return false;
        }
        setNameError("");
        return true;
    };

    const validatePhone = () => {
        const phoneRegex = /^\d{10,11}$/; // Regex pattern for 10-digit phone number

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
            setPastoralTeamError("Please select a pastoral team");
            return false;
        }

        console.log(pastoralTeam[0]);
        console.log([...pastoralTeam, "young_warrior"]);
        switch (pastoralTeam) {
            case "wonderkids":
                setPastoralTeam([...pastoralTeam, "wonderkids"]);
                break;
            case "heart":
            case "move":
            case "force":
            case "voice":
            case "mind":
                setPastoralTeam([...pastoralTeam, "young_warrior"]);
                break;
            case "yp_zone":
            case "pro_family":
            case "young_dreamer":
            case "joshua_zone":
                setPastoralTeam([...pastoralTeam, "general"]);
                break;
            default:
                break;
        }


        console.log(pastoralTeam);

        setPastoralTeamError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isPastoralTeamValid = validatePastoralTeam();

        if (isNameValid && isPhoneValid && isEmailValid && isPastoralTeamValid) {
            let info = {
                name,
                phone,
                email,
                pastoralTeam,
                // ministry
            }
            console.log(info);
            navigate("/complete");
            //let data = await postReq("/recruiter", info);
        }
    };

    return (
        <section
            style={{ backgroundColor: '#f5f5f8', padding: "0 35px" }}
            className="flex flex-col justify-between"
        >

            <div id="submission-container" className='flex' style={{ paddingTop: "25px" }}>
                <img src="../src/icons/left.svg" alt="Back Icon" />
                <h3 style={{
                    color: "#21416d", fontSize: "1.125rem", fontFamily: "SF Pro Display",
                    fontWeight: "600", marginLeft: "90px"
                }}>
                    Submission
                </h3>
            </div>
            <form action="#" id="submission-form" className="flex flex-col" style={{ marginTop: "10px" }}>
                <label htmlFor="name" className="input-text">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                {nameError && <div className="input-error">{nameError}</div>}

                <label htmlFor="phone" className="input-text">Phone</label>
                <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                {phoneError && <div className="input-error">{phoneError}</div>}

                <label htmlFor="email" className="input-text">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <div className="input-error">{emailError}</div>}

                <label htmlFor="pastoral_team" className="input-text">Pastoral Team</label>
                <select name="pastoral_team" id="pastoral_team" value={pastoralTeam} onChange={(e) => setPastoralTeam(e.target.value)}>
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
                </select>
                {pastoralTeamError && <div className="input-error">{pastoralTeamError}</div>}
            </form>
            <div className='flex flex-col align-center'>
                <h4 className="input-text" style={{ marginBottom: "10px 0px" }}>Your Ministry Selection</h4>
                <SelectedMinistry />
            </div>
            <button className="btn-submit" style={{ backgroundColor: "#173965", color: "white", marginBottom: "35px" }} onClick={handleSubmit}>
                Submit
            </button>
        </section>
    )
}