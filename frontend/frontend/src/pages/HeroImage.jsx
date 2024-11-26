import React from 'react';
import refimg from '../assets/meeting_vector.png';
import './HeroImage.css'
function HeroImage() {
    return (
        <div style={{ alignContent: "center" }}>
            <img src={refimg} alt="Meeting Vector" className='heroImage' />

            <p className='heroImageText' style={{ fontWeight: 100, fontSize: "20px", textAlign: "center" }}>
                Connect with people across the world.
            </p>
        </div>
    );
}

export default HeroImage;
