import '../../AppointmentPage/appointment.css'
import './leaderRegistration.css'
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { role_data } from './role_data';
import { Input } from '../../Form/Input/Input';
import { getRandomSixDigitPassword, validateEmail, validateField, validateID, validateName, validatePhone } from '../../../js/form';
import { useNavigate, useLocation } from 'react-router-dom';
import { set } from 'idb-keyval';
import { postReq } from '../../../js/requests';

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

function GenderPicker({ onSelect }) {
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
            <option value='' disabled hidden>Select a gender</option>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
        </select>
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

export default function LeaderRegistration({ onClose, leader }) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')
    const [cg, setCg] = useState(leader || '')
    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('')
    const [idError, setIdError] = useState('')
    const [genderError, setGenderError] = useState('')
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

    const getCgId = async () => {
        const leaderData = {
            name: "Kris Mok",
            user_id: 33,
        }

        let data = await postReq('/cg', leaderData)
        console.log(data)
    }

    const handleData = () => {
        const member_data = {
            email,
            password: `${getRandomSixDigitPassword()}@Aa`,
            username: `${fname.toLowerCase()}${lname.toLowerCase()}`,
            given_name: fname,
            family_name: lname,
            name: `${fname} ${lname}`,
            gender,
            ic_number: id,
            phone_number: phone,
            nickname: null,
            picture: null,
            cg_id: null,
        }

        if (pathname === '/leader_registration') {
            set('leader_data', member_data);
        } else {
            handleMemberList(member_data);
        }
        console.log(JSON.stringify(member_data));

        return member_data;
    }

    const handleNavigate = () => {
        if (pathname === '/leader_registration') {
            navigate('/leader_reg_success');
        } else {
            onClose();
        }
    }

    const postLeaderData = async (member_data) => {
        try {
            let data = await postReq('/signup', member_data);
            console.log(data);
        } catch (error) {
            console.error('Error during postLeaderData:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFnameValid = validateName(fname, setFnameError);
        const isLnameValid = validateName(lname, setLnameError);
        const isPhoneValid = validatePhone(phone, setPhoneError);
        const isEmailValid = validateEmail(email, setEmailError);
        const isIdValid = validateID(id, setIdError);
        const isRoleValid = pathname === '/member_registration' ?
            validateField(role, setRoleError, "Member's role is required") : true;

        if (isFnameValid && isLnameValid && isPhoneValid && isEmailValid && isIdValid && isRoleValid) {
            const member_data = handleData();
            console.log(member_data)
            postLeaderData(member_data);

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
                        label={'First Name'}
                        value={fname}
                        onChange={(event) => { handleChange(event, setFname, setFnameError) }}
                        error={fnameError}
                    />

                    <Input
                        label={'Last Name'}
                        value={lname}
                        onChange={(event) => { handleChange(event, setLname, setLnameError) }}
                        error={lnameError}
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

                    <>
                        <label className='input-text' value={gender}>Gender</label>
                        <GenderPicker onSelect={(selectedValue) => { handleSelect(selectedValue, setGender, setGenderError) }} />
                        {genderError && <div className='input-error'>{genderError}</div>}
                    </>

                    {
                        pathname === '/member_registration' && (
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