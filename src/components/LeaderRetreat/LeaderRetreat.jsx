import './leaderRetreat.css'
import { useState, useEffect } from 'react';
import { faq_data } from './leader_retreat_data';
import { getReq, putReq } from "../../js/requests.js";
import ReactFullpage from '@fullpage/react-fullpage'
import { removeCycFromString } from '../../js/string';
import { get } from 'idb-keyval';
import {getTimeStamp} from "../../js/dateTime.js";

const LeaderRetreat1 = ({ onSignUpClick }) => {
    return (
        <section
            className='flex flex-col justify-between align-center retreat-bg-1 relative section'
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        >
            {/* <div className='retreat-overlay'></div> */}
            <img src="/images/CYC_logo.png" alt="CYC Logo" id='cyc-logo' className='mt-45 relative' />
            <div className='flex flex-col align-center relative'>
                <img src="/images/retreat_title.png" alt="Leader's Retreat Title" />
                <div className='retreat-date'>28 - 29 OCT 2023</div>
            </div>
            <button className='btn-retreat mb-75 relative' onClick={onSignUpClick}>SIGN UP</button>
        </section>
    )
}

const LeaderRetreat2 = ({ onSignUpClick }) => {
    return (
        <section
            className='flex flex-col justify-between align-center retreat-bg-2 section'
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        >
            <div className='flex flex-col align-center'>
                <div className='retreat-2-text-1'>BAYOU LAGOON PARK RESORT</div>
                <div className='retreat-2-text-2'>MELAKA</div>
            </div>
            <button className='btn-retreat mb-75 relative' onClick={onSignUpClick}>SIGN UP</button>
        </section>
    )
}

const LeaderRetreat3 = ({
    openCollapse,
    handleToggle,
    // handleTouchStart,
    // handleTouchEnd,
    handleChange,
    handleSubmit }) => {

    return (
        <section
            className='flex flex-col justify-between align-center retreat-bg-3 relative section'
        // onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        >
            <div className='retreat-3-text-1'>FAQ</div>

            <div>
                {
                    faq_data.map((data, index) => {
                        return (
                            <Collapse
                                key={index}
                                title={data.question}
                                content={data.answer}
                                isOpen={openCollapse === index}
                                onToggle={() => handleToggle(index)}
                            />
                        )
                    })
                }
            </div>
            <div className='flex flex-col align-center mt-75 mb-75'>
                <img src="/images/retreat_title.png" alt="Leader's Retreat Title" />
                <div className='cycid-text'>CYC ID</div>
                <input className='input-cycid' onChange={handleChange} type="text" placeholder='CYC001' />
                <button className='btn-retreat' onClick={handleSubmit}>REGISTER</button>
            </div>
        </section>
    )
}

const Collapse = ({ title, content, isOpen, onToggle }) => {
    return (
        <div className="collapse-container">
            <div className="collapse-header" onClick={onToggle}>
                {title}
                <img
                    className={`arrow-icon ${isOpen ? 'expanded' : ''}`}
                    src="/icons/arrow-down.svg"
                    alt="Down Arrow Icon"
                />
            </div>
            {isOpen && <div className="collapse-content">
                {content.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>{item}</div><br />
                        </div>
                    )
                })}
            </div>}
        </div>
    );
};

export default function LeaderRetreat() {
    const [openCollapse, setOpenCollapse] = useState(null);
    const [cycid, setCycid] = useState('');

    useEffect(() => {

        document.querySelector(".fp-watermark").classList.add("d-none")

    }, [])

    // useEffect(() => {
    //     document.body.classList.add('no-scroll');
    //     setTimeout(() => {
    //         handlerSectionScroll(0);
    //     }, 500);

    //     return () => {
    //         document.body.classList.remove('no-scroll');
    //     };
    // }, []);

    // let startY;

    // const handleTouchStart = (event) => {
    //     const touch = event.touches[0];
    //     startY = touch.clientY;
    // };

    // const handleTouchEnd = (index) => (event) => {
    //     const touch = event.changedTouches[event.changedTouches.length - 1];
    //     const deltaY = touch.clientY - startY;

    //     if (deltaY < -50 && index !== 2) {
    //         setTimeout(() => {
    //             handlerSectionScroll(index + 1);
    //             if (index + 1 === 2) {
    //                 document.body.classList.remove('no-scroll');
    //             }
    //         }, 200);
    //     } else if (deltaY > 50) {
    //         setTimeout(() => {
    //             handlerSectionScroll(index - 1);
    //         }, 200);
    //     }
    // };

    const handleToggle = (index) => {
        setOpenCollapse((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleChange = (e) => {
        setCycid(e.target.value);
    }

    const handleGetName = async () => {
        const res = await getReq(`/auth/names?CYC_ID=${removeCycFromString(cycid)}`);

        if (res.status) {
            return res.data.full_name;
        } else {
            return false;
        }
    };

    const handlePutReq = () => {
        let data = {
            CYC_ID: parseInt(removeCycFromString(cycid)),
            leader_retreat: {
                year: 2023,
                status: "registered",
                created:  getTimeStamp()
            }
        }

        putReq("/leader_retreat", data).then((res) => {
            if (res.status) {
                alert('Thank you for registering!');
            } else {
                alert(res.error);
            }
        });
    }

    const handleConfirmRegister = (name) => {
        if (confirm(`Are you sure you want to register for ${name}?`) === true) {
            handlePutReq();
        } else {
            alert('Registration cancelled.');
        }
    }

    const handleSubmit = async () => {
        const regex = /^\d{1,6}$/;

        if (!regex.test(removeCycFromString(cycid.trim()))) {
            alert('Please enter a valid CYC ID.');
            return;
        }

        let name = await handleGetName();

        if (name) {
            handleConfirmRegister(name);
        } else {
            alert('CYC ID not found.');
        }
    }

    return (
        <ReactFullpage credits={{ enabled: false, label: "" }} render={({ fullpageApi }) => <ReactFullpage.Wrapper>
            <LeaderRetreat1
                onSignUpClick={() => fullpageApi.moveSectionDown()}
            />
            <LeaderRetreat2
                // handleTouchStart={handleTouchStart}
                // handleTouchEnd={handleTouchEnd(1)}
                onSignUpClick={() => fullpageApi.moveSectionDown()}
            />
            <LeaderRetreat3
                openCollapse={openCollapse}
                handleToggle={handleToggle}
                // handleTouchStart={handleTouchStart}
                // handleTouchEnd={handleTouchEnd(2)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            /></ReactFullpage.Wrapper>} />


    )
}