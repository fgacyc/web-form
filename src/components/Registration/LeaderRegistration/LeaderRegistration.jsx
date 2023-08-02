import '../../AppointmentPage/appointment.css'
import './leaderRegistration.css'
import { useState } from 'react';
import { Input } from '../../Form/Input/Input';
import { getRandomSixDigitPassword, validateEmail, validateField, validateID, validateName, validatePhone } from '../../../js/form';
import { set } from 'idb-keyval';
import { postReq } from '../../../js/requests';
import { capitalFirstLetter } from "../../../js/string.js";

export function GenderPicker({ onSelect }) {
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

export default function LeaderRegistration({ onClose, leader }) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [gender, setGender] = useState('')
    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('')
    const [idError, setIdError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [createdUserData, setCreatedLeaderData] = useState(null)

    const handleChange = (event, setField, setFieldError) => {
        setField(event.target.value);
        setFieldError('');
    }

    const handleSelect = (selectedValue, setField, setFieldError) => {
        setField(selectedValue);
        setFieldError('');
    };

    const handleData = () => {
        const capitalName = capitalFirstLetter(fname) + ' ' + capitalFirstLetter(lname);

        const member_data = {
            email,
            password: `${getRandomSixDigitPassword()}@Aa`,
            username: `${fname.toLowerCase()}_${lname.toLowerCase()}`,
            given_name: fname,
            family_name: lname,
            name: capitalName,
            gender,
            ic_number: id,
            phone_number: phone,
            nickname: capitalName,
            picture: null,
            cg_id: null,
        }



        return member_data;
    }

    const postLeaderData = async (member_data) => {
        try {
            let res = await postReq('/cgl', member_data);
            if (res.status === true) {
                setCreatedLeaderData(res.data);
                await set('leader_data', res.data);
                setTimeout(() => {
                    alert("Please screenshot this page for your reference");
                }, 2000);
            }else{
                alert("Error: " + res.error)
            }
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
        const isGenderValid = validateField(gender, setGenderError, 'Gender is required')

        if (isFnameValid && isLnameValid && isPhoneValid && isEmailValid && isIdValid && isGenderValid) {
            const member_data = handleData();
            console.log(member_data)
            postLeaderData(member_data);
        }
    }

    return (
        <>
            {!createdUserData
                ? <form
                    className='flex flex-col justify-between appointment-container align-center relative'
                    style={{ overflow: "auto", height: "100vh" }}
                    onSubmit={handleSubmit}
                >
                    <div>
                        <h3 className='appointment-h3'>Registration</h3>


                        <div className='flex flex-col'>
                            <Input
                                label={'First Name'}
                                value={fname}
                                onChange={(event) => { handleChange(event, setFname, setFnameError) }}
                                error={fnameError}
                                type='text'
                            />

                            <Input
                                label={'Last Name'}
                                value={lname}
                                onChange={(event) => { handleChange(event, setLname, setLnameError) }}
                                error={lnameError}
                                type='text'
                            />

                            <Input
                                label={'Contact No.'}
                                value={phone}
                                onChange={(event) => { handleChange(event, setPhone, setPhoneError) }}
                                error={phoneError}
                                type='number'
                            />

                            <Input
                                label={'Email Address'}
                                value={email}
                                onChange={(event) => { handleChange(event, setEmail, setEmailError) }}
                                error={emailError}
                                type='email'
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
                        </div>
                        <button type='submit' className='btn-submit'>Submit</button>
                    </div>
                </form >
                : <div className='flex flex-col align-center justify-between led-reg-success-con'>
                    <h3 className='led-reg-success-con-h3'>Completed</h3>
                    <img src='/images/completed.png' alt='Complete Icon' className='mt-10' />
                    <div className='flex flex-col'>
                        <label className='input-text'>Your CYC ID</label>
                        <div className='div-text'>CYC{createdUserData.CYC_ID}</div>
                        <label className='input-text'>Your Default Password</label>
                        <div className='div-text'>{createdUserData.password}</div>
                        <label className='input-text'>Member Registration</label>
                        <a href="/member_registration" className='div-text break-all deco-none'>https://fgacyc.com/serve/member_registration ]
                        <img src="/images/launch.png" alt="launch icon" style={{ width: 16, marginLeft: 10 }} /></a>
                    </div>
                    <div className='flex flex-col align-center'>
                        <img
                            className='mem-reg-qr'
                            src='/images/member_registration_qr.png'
                            alt='Member Registration QR Code'
                        />
                    </div>
                    <div>
                        <h4 className='complete-h4'>© 2023 FGACYC.</h4>
                        <h4 className='complete-h4' style={{ marginBottom: '45px' }}>All Rights Reserved</h4>
                    </div>
                </div>
            }
        </>
    )
}