import './leaderRetreat.css'
import { useState, useEffect } from 'react';
import { faq_data } from './leader_retreat_data';
import { handlerSectionScroll, handleScrollMostBottom } from '../../js/scroll';
import {putReq} from "../../js/requests.js";
import { removeCycFromString } from '../../js/string';

const LeaderRetreat1 = ({ handleTouchStart, handleTouchEnd }) => {
    return (
        <section
            className='flex flex-col justify-between align-center retreat-bg-1 relative'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* <div className='retreat-overlay'></div> */}
            <img src="/images/CYC_logo.png" alt="CYC Logo" id='cyc-logo' className='mt-45 relative' />
            <div className='flex flex-col align-center relative'>
                <img src="/images/retreat_title.png" alt="Leader's Retreat Title" />
                <div className='retreat-date'>28 - 29 OCT 2023</div>
            </div>
            <button className='btn-retreat mb-75 relative' onClick={handleScrollMostBottom}>SIGN UP</button>
        </section>
    )
}

const LeaderRetreat2 = ({ handleTouchStart, handleTouchEnd }) => {
    return (
        <section
            className='flex flex-col justify-between align-center retreat-bg-2'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className='flex flex-col align-center'>
                <div className='retreat-2-text-1'>BAYOU LAGOON PARK RESORT</div>
                <div className='retreat-2-text-2'>MELAKA</div>
            </div>
            <button className='btn-retreat mb-75 relative' onClick={handleScrollMostBottom}>SIGN UP</button>
        </section>
    )
}

const LeaderRetreat3 = ({
    openCollapse,
    handleToggle,
    handleTouchStart,
    handleTouchEnd,
    handleChange,
    handleSubmit }) => {

    return (
        <section
            className='flex flex-col justify-between align-center retreat-bg-3 relative'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
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
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            handlerSectionScroll(0);
        }, 500);

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    let startY;

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        startY = touch.clientY;
    };

    const handleTouchEnd = (index) => (event) => {
        const touch = event.changedTouches[event.changedTouches.length - 1];
        const deltaY = touch.clientY - startY;

        if (deltaY < -50 && index !== 2) {
            setTimeout(() => {
                handlerSectionScroll(index + 1);
                if (index + 1 === 2) {
                    document.body.classList.remove('no-scroll');
                }
            }, 200);
        } else if (deltaY > 50) {
            setTimeout(() => {
                handlerSectionScroll(index - 1);
            }, 200);
        }
    };

    const handleToggle = (index) => {
        setOpenCollapse((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleChange = (e) => {
        setCycid(e.target.value);
    }

    const handleSubmit = () => {
        const regex = /^\d{1,6}$/;

        if (!regex.test(removeCycFromString(cycid.trim()))) {
            alert('Please enter a valid CYC ID.');
            return;
        }

        const CYC_ID = cycid.trim().substring(3, cycid.trim().length);

        let data = {
            CYC_ID: parseInt(CYC_ID),
            leader_retreat:{
                year: 2023,
                status: "registered"
            }
        }

        putReq("/leader_retreat",data).then((res) => {
            console.log(res)
            if(res.status){
                alert('Thank you for registering!');
            }else{
                alert(res.error);
            }
        });
    }

    return (
        <>
            <LeaderRetreat1
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd(0)}
            />
            <LeaderRetreat2
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd(1)}
            />
            <LeaderRetreat3
                openCollapse={openCollapse}
                handleToggle={handleToggle}
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd(2)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    )
}