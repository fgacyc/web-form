import './ministryOption.css'
import  {useEffect, useState} from 'react';
import PubSub from "pubsub-js";

export default function MinistryOption() {
    const [showNavigation, setShowNavigation] = useState(true);
    const [departmentsNum, setDepartmentsNum] = useState(0);

    useEffect(() => {
        const subscription = PubSub.subscribe('departmentsNum', (msg, data) => {
            console.log(data.message);
            setDepartmentsNum(data.message);
        });
        return () => PubSub.unsubscribe(subscription);
    }, []);

    const toggleNavigation = () => {
        setShowNavigation(!showNavigation);
    };

    return (
        <>
            {departmentsNum >0 &&
            <div id='sticky-lego' className='flex justify-center align-center relative' onClick={toggleNavigation}>
                <img src="../src/images/lego.png" alt="Ministry Option" />
                <div className="logo-num">{departmentsNum}</div>
            </div>
            }

        </>
    )
}