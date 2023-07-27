import '../../AppointmentPage/appointment.css'
import { useState } from "react";
import { role_data } from './role_data';
import { validateEmail, validateID, validateName, validatePhone } from '../../../js/form';
import { useNavigate } from 'react-router-dom';

function Input({ label, value, onChange, error }) {
    return (
        <>
            <label className="input-text">{label}</label>
            <input type="text" value={value} onChange={onChange} />
            {error && <div className="input-error">{error}</div>}
        </>
    );
}

function RolePicker({ onSelect }) {
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
            <option value="" disabled hidden>Select a role</option>
            {
                role_data.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>{option.label}</option>
                    )
                })
            }
        </select>
    )
}

export default function LeaderRegistration() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [role, setRole] = useState('')
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('')
    const [idError, setIdError] = useState('')
    const [roleError, setRoleError] = useState('')

    const navigate = useNavigate();

    const handleChange = (event, setField, setFieldError) => {
        setField(event.target.value);
        setFieldError("");
    }

    const handleSelect = (selectedValue, setField, setFieldError) => {
        setField(selectedValue);
        setFieldError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const isNameValid = validateName(name, setNameError);
        const isPhoneValid = validatePhone(phone, setPhoneError);
        const isEmailValid = validateEmail(email, setEmailError);
        const isIdValid = validateID(id, setIdError);

        if (isNameValid && isPhoneValid && isEmailValid && isIdValid) {
            const leader_data = {
                full_name: name,
                phone,
                email,
                id,
                role
            }
            console.log(leader_data);
            
            navigate('/leader_reg_success');
        }
    }

    return (
        <form
            className="flex flex-col justify-between appointment-container align-center"
            onSubmit={handleSubmit}
        >
            <div>
                <h3 className="appointment-h3">Registration</h3>

                <div className="flex flex-col">
                    <Input
                        label={"Full Name"}
                        value={name}
                        onChange={(event) => { handleChange(event, setName, setNameError) }}
                        error={nameError}
                    />

                    <Input
                        label={"Contact No."}
                        value={phone}
                        onChange={(event) => { handleChange(event, setPhone, setPhoneError) }}
                        error={phoneError}
                    />

                    <Input
                        label={"Email Address"}
                        value={email}
                        onChange={(event) => { handleChange(event, setEmail, setEmailError) }}
                        error={emailError}
                    />

                    <Input
                        label={"Identity Card/ Passport No."}
                        value={id}
                        onChange={(event) => { handleChange(event, setId, setIdError) }}
                        error={idError}
                    />

                    <label className="input-text" value={role}>Role</label>
                    <RolePicker onSelect={(selectedValue) => { handleSelect(selectedValue, setRole, setRoleError) }} />
                    {roleError && <div className="input-error">{roleError}</div>}
                </div>

            </div>
            <button type="submit" className="btn-submit">Submit</button>
        </form >
    )
}