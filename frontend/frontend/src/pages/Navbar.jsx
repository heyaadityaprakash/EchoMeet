import React from 'react';
import Button from '@mui/material/Button';

import './Navbar.css'
import logo from '../assets/EchoMeet.png';

function Navbar() {
    return ( 
        <nav>
        <div className='navheader'>
            <img src={logo} alt="" />
            <h2 style={{paddingLeft:"14px"}}>EchoMeet</h2>
        </div>
        
        <div className='navlist'>
            <Button variant="outlined" sx={{
                borderRadius:"999px",
                color:"#117FC5",
                borderColor:"#117FC5",
                padding:"5px 30px"
            }} >Register</Button>
            <Button variant="contained" sx={{
                borderRadius:"999px",
                backgroundColor:"#117FC5",
                color:"#eeeeee",
                padding:"5px 30px"
            }}>Log In</Button>
        </div>
    </nav>
     );
}

export default Navbar;