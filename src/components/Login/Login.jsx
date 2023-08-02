import { useEffect, useState } from 'react'
import { Input } from "../Form/Input/Input"
import { validateCycId, validateField } from '../../js/form';
import { set, get } from 'idb-keyval';
import { getReq } from '../../js/requests';
import { removeCycFromString } from '../../js/string';

export default function Login() {
    const [cycid, setCycid] = useState();
    const [pwd, setPwd] = useState();
    const [cycidError, setCycidError] = useState('');
    const [pwdError, setPwdError] = useState('');

    useEffect(() => {
        get("leader_data").then((data) => {
            if (data) {
                setCycid(data.CYC_ID)
                setPwd(data.password)
            }
        });
    }, []);

    const handleChange = (event, setField, setFieldError) => {
        setField(event.target.value);
        setFieldError('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const isCycidValid = validateCycId(cycid, setCycidError);
        const isPwdValid = validateField(pwd, setPwdError, 'Password is required.');

        if (isCycidValid && isPwdValid) {
            getReq(`/cgl/login?CYC_ID=${removeCycFromString(cycid)}&password=${pwd}`)
                .then((res) => {
                    if (!res.status) {
                        alert(res.error)
                    }
                    else {
                        set("leader_data", res.data).then(() => {
                            window.location.href = '/member_registration';
                        });
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