import './ministryOption.css'
import  {useEffect, useState} from 'react';
import PubSub from "pubsub-js";
import {useNavigate} from "react-router-dom";

export default function MinistryOption(){
    const [departmentsNum, setDepartmentsNum] = useState(0);
    const navigation = useNavigate()

    useEffect(() => {
        const subscription = PubSub.subscribe('departmentsNum', (msg, data) => {
            // console.log(data.message);
            setDepartmentsNum(data.message);
        });

        let selectedMinistry = JSON.parse(localStorage.getItem('cyc-department-selected'));
        if (selectedMinistry) {
            setDepartmentsNum(selectedMinistry.length);
        }

        return () => PubSub.unsubscribe(subscription);
    }, []);

    const toggleNavigation = () => {
        if (departmentsNum > 0) {
            navigation('/selection');
        }
    };

    return (
        <>
            {departmentsNum >0 &&
            <div id='sticky-lego' className='flex justify-center align-center relative' onClick={toggleNavigation}>
                <img src="/images/lego.png" alt="Ministry Option" />
                <div className="logo-num">{departmentsNum}</div>
            </div>
            }
        </>
    )
}