import { useEffect, useState } from "react";
import { organization_structure } from "../../data/organization_structure";
import { pastoral_team, formatOption } from "../../data/pastoral_team";
import { hostURL } from "../../config";
import { postReq } from "../../js/requests";

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

export default function Attendance() {
    const [pastoral, setPastoral] = useState('')
    const [ministry, setMinistry] = useState('')
    const [RID, setRID] = useState('')
    const [attendees_name_list, setAttendeesNameList] = useState([])
    const [pastoralError, setPastoralError] = useState('')
    const [ministryError, setMinistryError] = useState('')
    const [nameError, setNameError] = useState('')

    useEffect(() => {
        if (pastoral && ministry) {
            fetch(hostURL + `/passed_candidates/${pastoral}/${ministry}`)
                .then(res => res.json())
                .then(data => {
                    setAttendeesNameList(data);
                });
        }
    }, [pastoral, ministry])

    const handlePastoralSelect = (selectedValue) => {
        setPastoral(selectedValue);
        setPastoralError("");
    };

    const handleMinistrySelect = (selectedValue) => {
        setMinistry(selectedValue);
        setMinistryError("");
    };

    const handleAttendeesNameSelect = (event) => {
        setRID(event.target.value);
        setNameError("");
    };

    const validateField = (field, setFieldError, errorMsg) => {
        if (field === "") {
            setFieldError(errorMsg);
            return false;
        }
        setFieldError("");
        return true;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const isPastoralValid = validateField(pastoral, setPastoralError, "Please select a pastoral team");
        const isMinistryValid = validateField(ministry, setMinistryError, "Please select a ministry");
        const isNameValid = validateField(RID, setNameError, "Please select a name");

        if (isPastoralValid && isMinistryValid && isNameValid) {
            let attendance = await postReq(`/orientation/attendance/${RID}`, {});
            if (attendance.status) {
                alert("Attendance recorded successfully");
            }
        }
    };

    return (
        <form
            className="flex flex-col justify-between appointment-container align-center"
            onSubmit={handleSubmit}
        >
            <div>
                <h3 className="appointment-h3">Orientation Attendance</h3>

                <div action="#" className="flex flex-col">
                    <label className="input-text">Pastoral Team</label>
                    <PastoralTeamPicker onSelect={handlePastoralSelect} />
                    {pastoralError && <div className="input-error">{pastoralError}</div>}

                    <label className="input-text">Ministry</label>
                    <MinistryPicker onSelect={handleMinistrySelect} />
                    {ministryError && <div className="input-error">{ministryError}</div>}

                    <label className="input-text">Attendees Name</label>
                    <select
                        className="appointment-select"
                        value={RID}
                        onChange={handleAttendeesNameSelect}
                    >
                        <option value="" disabled hidden>Select a name</option>
                        {
                            attendees_name_list.length > 0 && (
                                attendees_name_list.map((option, index) => {
                                    return (
                                        <option key={index} value={option._id}>{option.info.name}</option>
                                    )
                                })
                            )
                        }
                    </select>
                    {nameError && <div className="input-error">{nameError}</div>}
                </div>

            </div>
            <button type="submit" className="btn-submit">Submit</button>
        </form >
    )
}