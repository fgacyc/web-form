import '../../AppointmentPage/appointment.css'
import './leaderRegistration.css'
import { useState } from 'react';
import { Input } from '../../Form/Input/Input';
import { getRandomSixDigitPassword, validateEmail, validateField, validateID, validateName, validatePhone } from '../../../js/form';
import { set } from 'idb-keyval';
import { postReq } from '../../../js/requests';
import { capitalFirstLetter } from "../../../js/string.js";
import { useLocation } from 'react-router-dom';
import FieldPicker from '../../Form/FieldPicker/FieldPicker';
import { gender_data, ministry_role } from '../../Form/picker_data';
import { MinistryPicker, DepartmentPicker, TeamPicker } from '../../Attendance/Attendance';
import { findDepartmentArray, findMinistryArray } from '../../../js/ministries';

export default function LeaderRegistration() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [gender, setGender] = useState('')
    const [ministry, setMinistry] = useState('')
    const [ministryRole, setMinistryRole] = useState('')

    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('')
    const [idError, setIdError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [ministryError, setMinistryError] = useState('')
    const [ministryRoleError, setMinistryRoleError] = useState('')

    const [createdUserData, setCreatedLeaderData] = useState(null)

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

    const handleMinistryArray = (ministryRole) => {
        switch (ministryRole) {
            case 'ministry_pic':
                return findMinistryArray(ministry);
                break;
            case 'department_head':
                return findDepartmentArray(ministry);
                break;
            case 'team_leader':
                return [ministry];
        }
    }

    const handleData = () => {
        const capitalName = capitalFirstLetter(fname) + ' ' + capitalFirstLetter(lname);

        if (email === "") {
            setEmail(`${phone}@fgacyc.com`);
        }

        let member_data;

        if (pathname === '/ministry_registration') {
            member_data = {
                full_name: capitalName,
                username: `${fname.toLowerCase()}_${lname.toLowerCase()}`,
                email,
                ministry: {
                    ministry: handleMinistryArray(ministryRole),
                    ministry_role: ministryRole
                },
                phone_number: phone,
                password: `${getRandomSixDigitPassword()}@Aa`,
                ic_number: id,
            }
        } else {
            member_data = {
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
        }

        return member_data;
    }

    const postData = async (route, member_data) => {
        try {
            let res = await postReq(route, member_data);
            if (res.status === true) {
                setCreatedLeaderData(res.data);

                if (pathname !== '/ministry_registration') {
                    await set('leader_data', res.data);
                }

                setTimeout(() => {
                    alert("Please screenshot this page for your reference");
                }, 2000);
            } else {
                alert("Error: " + res.error)
            }
        } catch (error) {
            console.error('Error during postData:', error);
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
        let isMinistryValid = true;
        let isMinistryRoleValid = true;

        if (pathname === '/ministry_registration') {
            isMinistryValid = validateField(ministry, setMinistryError, 'Ministry is required')
            isMinistryRoleValid =
                validateField(ministryRole, setMinistryRoleError, 'Ministry Role is required')
        }

        if (isFnameValid && isLnameValid && isPhoneValid
            && isEmailValid && isIdValid && isGenderValid
            && isMinistryValid && isMinistryRoleValid) {
            const member_data = handleData();

            if (pathname === '/ministry_registration') {
                postData('/minister', member_data);
            } else {
                postData('/cgl', member_data);
            }
        }
    }

    return (
        <>
            {!createdUserData
                ? <form
                    className='flex flex-col justify-between appointment-container align-center relative'
                    style={{ overflow: "auto" }}
                    onSubmit={handleSubmit}
                >
                    <div>
                        <h3 className='appointment-h3'>
                            {
                                pathname === '/ministry_registration' ? 'Ministry Registration' : 'Leader Registration'
                            }
                        </h3>


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

                            <label className='input-text' value={gender}>Gender</label>
                            <FieldPicker
                                onSelect={(selectedValue) => { handleSelect(selectedValue, setGender, setGenderError) }}
                                title={'Select a gender'}
                                data={gender_data}
                            />
                            {genderError && <div className='input-error'>{genderError}</div>}

                            {
                                pathname === '/ministry_registration' && (
                                    <>
                                        <label className='input-text' value={gender}>Ministry Role</label>
                                        <FieldPicker
                                            onSelect={(selectedValue) => { handleSelect(selectedValue, setMinistryRole, setMinistryRoleError) }}
                                            title={'Select a ministry role'}
                                            data={ministry_role}
                                        />

                                        {ministryRoleError && <div className='input-error'>{ministryRoleError}</div>}
                                        <label className='input-text' value={gender}>Ministry</label>
                                        {
                                            ministryRole === 'team_leader' &&
                                            (<TeamPicker
                                                onSelect={(selectedValue) => { handleSelect(selectedValue, setMinistry, setMinistryError) }}
                                            />
                                            )

                                        }
                                        {
                                            ministryRole === 'department_head' &&
                                            (<DepartmentPicker
                                                onSelect={(selectedValue) => { handleSelect(selectedValue, setMinistry, setMinistryError) }}
                                            />
                                            )

                                        }
                                        {
                                            ministryRole !== 'team_leader' && ministryRole !== 'department_head' &&
                                            (
                                                <MinistryPicker
                                                    onSelect={(selectedValue) => { handleSelect(selectedValue, setMinistry, setMinistryError) }}
                                                />
                                            )
                                        }
                                        {ministryError && <div className='input-error'>{ministryError}</div>}
                                    </>
                                )
                            }
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
                        {
                            pathname !== '/ministry_registration' && (
                                <>
                                    <label className='input-text'>Member Registration</label>
                                    <a href="/member_registration" className='div-text break-all deco-none'>https://fgacyc.com/serve/member_registration
                                        <img src="/images/launch.png" alt="launch icon" style={{ width: 16, marginLeft: 10 }} />
                                    </a>
                                </>
                            )
                        }
                    </div>
                    {
                        pathname !== '/ministry_registration' && (
                            <div className='flex flex-col align-center'>
                                <img
                                    className='mem-reg-qr'
                                    src='/images/member_registration_qr.png'
                                    alt='Member Registration QR Code'
                                />
                            </div>
                        )
                    }
                    <div>
                        <h4 className='complete-h4'>© 2023 FGACYC.</h4>
                        <h4 className='complete-h4' style={{ marginBottom: '45px' }}>All Rights Reserved</h4>
                    </div>
                </div>
            }
        </>
    )
}