import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './MeetingLinkForm.css'
function MeetingLinkForm() {
    return (
        <div className='connectbuttons'>
            <Button
                    variant="contained"
                    sx={{
                        borderRadius: "999px",
                        backgroundColor: "#117FC5",
                        color: "#eeeeee",
                        padding: "5px 30px",
                    }}
                >
                    Get Started
            </Button>
            <TextField
                id="outlined-basic"
                label="Enter Meeting Link"
                variant="outlined"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "999px",
                        "& fieldset": { borderColor: "#eeeeee" },
                        "&:hover fieldset": { borderColor: "#eeeeee" },
                        "&.Mui-focused fieldset": { borderColor: "#41A857" },
                    },
                    "& .MuiOutlinedInput-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "#eeeeee" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#41A857" },
                }}
            />
            <Button
                variant="contained"
                sx={{
                    borderRadius: "999px",
                    backgroundColor: "#41A857",
                    color: "#eeeeee",
                    padding: "5px 30px",
                }}
            >
                Join
            </Button>
        </div>
    );
}

export default MeetingLinkForm;
