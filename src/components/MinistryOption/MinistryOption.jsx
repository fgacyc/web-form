import './ministryOption.css'
import React, { useState } from 'react';

export default function MinistryOption() {
    const [showNavigation, setShowNavigation] = useState(false);

    const toggleNavigation = () => {
        setShowNavigation(!showNavigation);
    };

    return (
        <>
            <div id='sticky-lego' className='flex justify-center align-center relative' onClick={toggleNavigation}>
                <img src="../src/images/lego.png" alt="Ministry Option" />
            </div>
            {showNavigation && (
                <section style={{ backgroundColor: "yellow", position: "absolute", zIndex: 9998, top: 0 }}></section>
            )}
        </>
    )
}