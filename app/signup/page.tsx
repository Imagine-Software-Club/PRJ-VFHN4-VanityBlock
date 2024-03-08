'use client'
import React, { useState } from 'react';
// import MainMenuHeader from '@/src/components/MainMenuHeader'
import Box, { BoxProps } from '@mui/material/Box';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Link from 'next/link';

const wrapper = {
    display: 'flex',
    justifyContent: 'center',
}

const container = {
    flexDirection: 'column',
    backgroundColor: '#F4F6FF',
    width: '28%',
    px: 5,
    pt: 3,
    borderRadius: 2.5,
    boxShadow: 4,
    minHeight: 500,
}

const signup = {
    color: '#222E61',
    fontSize: '1.8rem',
    fontWeight: 700,
    // letterSpacing: 1,
}

const email_password = {
    color: '#1C1C1D',
    fontSize: '1.35rem',
    pt: 3,
    fontWeight: 550,
}

const term = {
    justifyContent: 'center',
    alignItem: 'center',
    color: '#9595A6',
    pt: 3,
}

const link_term = {
    color: '#222E61',
}

const textfield = {
    '& .MuiOutlinedInput-root':{
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        '& .MuiOutlinedInput-notchedOutline':{
            border: '2px solid',
        },
        '& .MuiOutlinedInput-notchedOutline:hover':{
            // border: '2px solid',
        }
    },
}

export default function SignUp(){
    
    const [signUp, setSignUp] = useState({
        email: "",
        password: "",
    })

    const HandleChange = (e) => {
        const {name, value} = e.target;
        setSignUp({
            ...signUp,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signUp);

        try {
            const response = await fetch('https://localhost:8000/sign-up', {
                method: 'POST',
                headers: {
                    'Content type': 'application/json',
                },
                body: JSON.stringify(signUp)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error sign up user:', error);
        }
    };
    

    return (
        <Box sx = {{...wrapper}}>
            <Box sx = {{...container}}>
                <Box sx = {{...signup}}> Sign up </Box>
                
                <Box sx = {{...email_password}}> Email </Box>
                <TextField 
                    sx = {{...textfield}}
                    size = "small"
                    fullWidth
                >
                
                </TextField>
                
                <Box sx = {{...email_password}}> Password </Box>
                <TextField 
                    sx = {{...textfield}} 
                    size = "small"
                    fullWidth
                >

                </TextField>

                {/**
                <TextField
                    label="My Label"
                    defaultValue="My Value"
                    size="small"
                    sx={{
                    ".MuiInputBase-input": {
                        padding: '1px 3px',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        border: '2px solid',
                    }
                    }}
                />
                */}

                <Box sx = {{...term}}> 
                    By clicking Sign up, you agree to
                    VanityBlock's <Link href = 'localhost:3000'> Terms and Conditions </Link>
                </Box>

                <Button>
                    Sign up
                </Button>

                <Box>
                    Already have an account? 
                    <Button>
                        Login
                    </Button>
                </Box>

            </Box>
        </Box>
    );
}