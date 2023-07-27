import '../AppointmentPage/appointment.css'
import { useEffect, useState } from "react";
import { organization_structure } from "../../data/organization_structure";
import { pastoral_team, formatOption } from "../../data/pastoral_team";
import { hostURL } from "../../config";
import { postReq } from "../../js/requests";
import { education_data } from "../../data/education_data";
import { getTimeStamp } from "../../js/dateTime";

function PastoralTeamPicker({ onSelect }) {
    const [showInitialOption, setShowInitialOption] = useState(true);

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        onSelect(selectedValue);
        setShowInitialOption(false);
    };

    return (
        <select
            className="appointment-select"
            value={showInitialOption ? "" : undefined}
            onChange={handleSelect}
        >
            <option value="" disabled hidden>Select a pastoral team</option>
            {
                Object.entries(pastoral_team).map(([label, team], index) => {

                    return (
                        <optgroup key={index} label={formatOption(label)}>
                            {
                                team.map((option, index) => {
                                    return (
                                        <option key={index} value={option}>{formatOption(option)}</option>
                                    )
                                })
                            }
                        </optgroup>
                    )
                })
            }
        </select>
    )
}

function MinistryPicker({ onSelect }) {
    const [showInitialOption, setShowInitialOption] = useState(true);

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        onSelect(selectedValue);
        setShowInitialOption(false);
    };

    return (
        <select
            className="appointment-select"
            value={showInitialOption ? "" : undefined}
            onChange={handleSelect}
        >
            <option value="" disabled hidden>Select a ministry</option>
            {
                Object.entries(organization_structure).map(([team, department], index) => {
                    return (
                        <optgroup key={index} label={formatOption(team)}>
                            {
                                Object.entries(department).map(([dep, ministry], index) => {
                                    return (
                                        ministry.map((option, index) => {
                                            return <option key={index} value={option}>{formatOption(option)}</option>
                                        })
                                    )
                                })
                            }
                        </optgroup>
                    )
                })
            }
        </select>
    )
}

function NamePicker({ onSelect, nameList }) {
    const [showInitialOption, setShowInitialOption] = useState(true);

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        onSelect(selectedValue);
        setShowInitialOption(false);
    };

    return (
        <select
            className="appointment-select"
            value={showInitialOption ? "" : undefined}
            onChange={handleSelect}
        >
            <option value="" disabled hidden>Select a name</option>
            {
                nameList.map((option, index) => {
                    return (
                        <option key={index} value={option._id}>{option.info.name}</option>
                    )
                })
            }
        </select>
    )
}

function EducationPicker({ onSelect }) {
    const [showInitialOption, setShowInitialOption] = useState(true);

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        onSelect(selectedValue);
        setShowInitialOption(false);
    };

    return (
        <select
            className="appointment-select"
            value={showInitialOption ? "" : undefined}
            onChange={handleSelect}
        >
            <option value="" disabled hidden>Select an education level</option>
            <option value={"none"}>None</option>
            {
                education_data.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>{option.label}</option>
                    )
                })
            }
        </select>
    )
}

export default function Attendance() {
    const [pastoral, setPastoral] = useState('')
    const [ministry, setMinistry] = useState('')
    const [RID, setRID] = useState('')
    const [education, setEducation] = useState('')
    const [attendees_name_list, setAttendeesNameList] = useState([])
    const [pastoralError, setPastoralError] = useState('')
    const [ministryError, setMinistryError] = useState('')
    const [nameError, setNameError] = useState('')
    const [educationError, setEducationError] = useState('')

    useEffect(() => {
        if (pastoral && ministry) {
            fetch(hostURL + `/passed_candidates/${pastoral}/${ministry}`)
                .then(res => res.json())
                .then(data => {
                    setAttendeesNameList(data);
                });
        }
    }, [pastoral, ministry]);

    const handleSelect = (selectedValue, setField, setFieldError) => {
        setField(selectedValue);
        setFieldError("");
    };

    const validateField = (field, setFieldError, errorMsg) => {
        if (field === "") {
            setFieldError(errorMsg);
            return false;
        }
        setFieldError("");
        return true;
    };

    const updateMsj = (value) => {
        const msj = {
            "msj1": {
                "created": null,
                "updated": null,
                "status": null
            },
            "msj2": {
                "created": null,
                "updated": null,
                "status": null
            },
            "msj3": {
                "created": null,
                "updated": null,
                "status": null
            }
        }

        if (value === 'none') {
            return msj;
        }

        const msjKeys = Object.keys(msj);
        let isBeforeMsjn = true;

        for (const key of msjKeys) {
            if (key === value) {
                isBeforeMsjn = false;
            }

            if (isBeforeMsjn) {
                msj[key].status = "finished";
            }

            if (key === value) {
                const timeStamp = getTimeStamp();
                msj[key].created = timeStamp;
                msj[key].updated = timeStamp;
                msj[key].status = "finished";
            }
        }

        return msj;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isPastoralValid = validateField(pastoral, setPastoralError, "Please select a pastoral team");
        const isMinistryValid = validateField(ministry, setMinistryError, "Please select a ministry");
        const isNameValid = validateField(RID, setNameError, "Please select a name");
        const isEducationValid = validateField(education, setEducationError, "Please select an education level");

        if (isPastoralValid && isMinistryValid && isNameValid && isEducationValid) {
            const education_data = updateMsj(education);
            let attendance = await postReq(`/orientation/attendance/${RID}`, education_data);
            if (attendance.status) {
                alert("Attendance recorded successfully");
            }
        }
    }

    return (
        <form
            className="flex flex-col justify-between appointment-container align-center"
            onSubmit={handleSubmit}
        >
            <div>
                <h3 className="appointment-h3">Orientation Attendance</h3>

                <div className="flex flex-col">
                    <label className="input-text">Pastoral Team</label>
                    <PastoralTeamPicker onSelect={(selectedValue) => { handleSelect(selectedValue, setPastoral, setPastoralError) }} />
                    {pastoralError && <div className="input-error">{pastoralError}</div>}

                    <label className="input-text">Ministry</label>
                    <MinistryPicker onSelect={(selectedValue) => { handleSelect(selectedValue, setMinistry, setMinistryError) }} />
                    {ministryError && <div className="input-error">{ministryError}</div>}

                    <label className="input-text">Attendees Name</label>
                    <NamePicker
                        onSelect={(selectedValue) => { handleSelect(selectedValue, setRID, setNameError) }}
                        nameList={attendees_name_list}
                    />
                    {nameError && <div className="input-error">{nameError}</div>}

                    <label className="input-text">Education</label>
                    <EducationPicker onSelect={(selectedValue) => { handleSelect(selectedValue, setEducation, setEducationError) }} />
                    {educationError && <div className="input-error">{educationError}</div>}
                </div>

            </div>
            <button type="submit" className="btn-submit">Submit</button>
        </form >
    )
}