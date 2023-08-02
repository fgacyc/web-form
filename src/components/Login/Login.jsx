import { useEffect, useState } from 'react'
import { Input } from "../Form/Input/Input"
import { validateField } from '../../js/form';
import { set, get } from 'idb-keyval';
import { getReq } from '../../js/requests';

export default function Login() {
    const [cycid, setCycid] = useState(get('cycid') || '');
    const [pwd, setPwd] = useState(get('pwd') || '');
    const [cycidError, setCycidError] = useState('');
    const [pwdError, setPwdError] = useState('');

    useEffect(() => {
        // if (cycid && pwd) {
        //     window.location.href = '/member_registration';
        // }
    }, []);

    const handleChange = (event, setField, setFieldError) => {
        setField(event.target.value);
        setFieldError('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const isCycidValid = validateField(cycid, setCycidError, 'CYC ID is required. eg. 001');
        const isPwdValid = validateField(pwd, setPwdError, 'Password is required.');

        if (isCycidValid && isPwdValid) {
            set('cycid', cycid);
            set('pwd', pwd);

            console.log('cycid', cycid);
            console.log('pwd', pwd);

            getReq(`/cgl/login?CYC_ID=${cycid}&password=${pwd}`)
                .then((res) => {
                    if (!res.status) {
                        alert(res.error)
                    }
                    else {
                        window.location.href = '/member_registration';
                    }
                })
        }
    }

    return (
        <form
            className='flex flex-col justify-center appointment-container align-center relative'
            style={{ overflow: "auto", height: "100vh" }}
            onSubmit={handleSubmit}
        >
            <div>
                <h3 className='appointment-h3'>Login</h3>


                <div className='flex flex-col'>
                    <Input
                        label={'CYC ID'}
                        value={cycid}
                        onChange={(event) => { handleChange(event, setCycid, setCycidError) }}
                        error={cycidError}
                    />

                    <Input
                        label={'Password'}
                        value={pwd}
                        type={'password'}
                        onChange={(event) => { handleChange(event, setPwd, setPwdError) }}
                        error={pwdError}
                    />
                </div>
                <button type='submit' className='btn-submit'>Login</button>
            </div>
        </form >
    )
}