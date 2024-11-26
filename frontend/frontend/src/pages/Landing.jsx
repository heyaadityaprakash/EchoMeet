import React from 'react';
import Button from '@mui/material/Button';
import '../App.css'
import logo from '../assets/EchoMeet.png'
import refimg from '../assets/meeting_vector.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';



function Landing() {
    return ( 
        <div className='landingPageContainer'>
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


            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>
                        Video Calls and Meetings for Everyone
                        </h1>
                        <p>
                        connect collaborate and celebrate with your loved ones from anywhere with <span>EchoMeet</span>
                        </p>

                        <div className='connectbuttons'>
                            <Button variant="contained" sx={{
                            borderRadius:"999px",
                            backgroundColor:"#117FC5",
                            color:"#eeeeee",
                            padding:"5px 30px"
                            }}>Get Started</Button>

                            <TextField id="outlined-basic" label="Enter Meeting Link" variant="outlined"sx={{
                                "& .MuiOutlinedInput-root": {
                                 borderRadius: "999px", // Pill shape
                                "& fieldset": {
                                 borderColor: "#eeeeee", // Border color
                                },
                                "&:hover fieldset": {
                                borderColor: "#eeeeee", // Darker color on hover
                                 },
                                "&.Mui-focused fieldset": {
                                borderColor: "#41A857", // Border color when focused
                                    },
                                },
                            "& .MuiInputLabel-root": {
                             color: "#eeeeee", // Label color
                                },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#41A857", // Label color when focused
                                },
                                }} />
                            
                            <Button variant="contained" sx={{
                            borderRadius:"999px",
                            backgroundColor:"#41A857",
                            color:"#eeeeee",
                            padding:"5px 30px"
                            }}>Join</Button>
                        </div>


                    </div>
                    <div className='col md-6' style={{alignContent:"center"}}>
                        <img src={refimg} alt="" />
                        <p style={{fontWeight:100, fontSize:"20px", textAlign:"center"}}>Connect with people across the world.</p>

                     </div>
                </div>
 
            </div>
          
        </div>


     );
}

export default Landing;