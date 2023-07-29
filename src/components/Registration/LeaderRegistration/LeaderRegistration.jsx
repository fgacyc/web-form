import '../../AppointmentPage/appointment.css'
import './leaderRegistration.css'
import { useState } from 'react';
import PubSub from 'pubsub-js';
import { role_data } from './role_data';
import { Input } from '../../Form/Input/Input';
import { validateEmail, validateField, validateID, validateName, validatePhone } from '../../../js/form';
import { useNavigate, useLocation } from 'react-router-dom';
import { set } from 'idb-keyval';

function CloseIcon({ onClose }) {
    return (
        <img
            src='/icons/cross.png'
            alt='Cross Icon'
            className='close-button'
            onClick={onClose}
        />
    )
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
            className='appointment-select'
            value={showInitialOption ? '' : undefined}
            onChange={handleSelect}
        >
            <option value='' disabled hidden>Select a role</option>
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

export default function LeaderRegistration({ onClose }) {
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

    const location = useLocation();
    const pathname = location.pathname;

    const handleChange = (event, setField, setFieldError) => {
        setField(event.target.value);
        setFieldError('');
    }

    const handleSelect = (selectedValue, setField, setFieldError) => {
        setField(selectedValue);
        setFieldError('');
    };

    const handleMemberList = (member_data) => {
        PubSub.publish('memberlist', member_data)
    }

    const handleData = () => {
        if (role === '') {
            setRole('member');
        }

        const member_data = {
            full_name: name,
            phone,
            email,
            id,
            role
        }

        if (pathname === '/leader_registration') {
            set('leader_data', member_data);
        } else {
            handleMemberList(member_data);
        }

        // console.log(member_data);
    }

    const handleNavigate = () => {
        if (pathname === '/leader_registration') {
            navigate('/leader_reg_success');
        } else {
            onClose();
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const isNameValid = validateName(name, setNameError);
        const isPhoneValid = validatePhone(phone, setPhoneError);
        const isEmailValid = validateEmail(email, setEmailError);
        const isIdValid = validateID(id, setIdError);
        const isRoleValid = pathname === '/leader_registration' ?
            validateField(role, setRoleError) : true;

        if (isNameValid && isPhoneValid && isEmailValid && isIdValid && isRoleValid) {
            handleData();
            handleNavigate();
        }
    }

    return (
        <form
            className={`flex flex-col justify-between appointment-container align-center relative
            ${pathname !== '/leader_registration' ? 'transparent-background' : ''}`}
            onSubmit={handleSubmit}
        >
            {
                pathname !== '/leader_registration' && (
                    <CloseIcon onClose={onClose} />
                )
            }

            <div>
                {
                    pathname === '/leader_registration' && (
                        <h3 className='appointment-h3'>Registration</h3>
                    )
                }

                <div className={`flex flex-col 
                ${pathname === '/leader_registration' ? '' : 'mt-35'}`}>
                    <Input
                        label={'Full Name'}
                        value={name}
                        onChange={(event) => { handleChange(event, setName, setNameError) }}
                        error={nameError}
                    />

                    <Input
                        label={'Contact No.'}
                        value={phone}
                        onChange={(event) => { handleChange(event, setPhone, setPhoneError) }}
                        error={phoneError}
                    />

                    <Input
                        label={'Email Address'}
                        value={email}
                        onChange={(event) => { handleChange(event, setEmail, setEmailError) }}
                        error={emailError}
                    />

                    <Input
                        label={'Identity Card/ Passport No.'}
                        value={id}
                        onChange={(event) => { handleChange(event, setId, setIdError) }}
                        error={idError}
                    />

                    {
                        pathname === '/leader_registration' && (
                            <>
                                <label className='input-text' value={role}>Role</label>
                                <RolePicker onSelect={(selectedValue) => { handleSelect(selectedValue, setRole, setRoleError) }} />
                                {roleError && <div className='input-error'>{roleError}</div>}
                            </>
                        )
                    }
                </div>
                <button type='submit' className='btn-submit'>Submit</button>
            </div>
        </form >
    )
}