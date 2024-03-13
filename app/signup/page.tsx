'use client'
import React, { useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import { createTheme, PaletteColorOptions, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

const sign_up = {
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

const term_line_1 = {
    color: '#9595A6',
    pt: 2,
    fontWeight: 450,
    fontSize: '1.1rem',
}

const term_line_2 = {
    color: '#9595A6',
    pt: 0,
    fontWeight: 450,
    fontSize: '1.1rem',
    pb: 2,
}

const link_term = {
    color: '#222E61',
    fontWeight: 500,
    textDecorationColor: '#222E61',
}

declare module '@mui/material/styles' {
    interface CustomPalette {
      anger: PaletteColorOptions;
      apple: PaletteColorOptions;
      steelBlue: PaletteColorOptions;
      violet: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      anger: true;
      apple: true;
      steelBlue: true;
      violet: true;
    }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: createColor('#F40B27'),
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
    primary: createColor('#222E61'),
  },
  components:{
    MuiButtonBase:{
        styleOverrides: {
            root: {
                color: '#222E61'
            }
        }
    }
  }
});

const textfield = {
    '& .MuiOutlinedInput-root':{
        backgroundColor: '#FFFFFF',
        // fontWeight: 'bold',
        '& .MuiOutlinedInput-notchedOutline':{
            border: '2px solid',
        },
        '& .MuiOutlinedInput-notchedOutline:hover':{
            border: '2px solid',
        }
    },
}

function Center(props: any) {

    const { children } = props

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
            {...props}
        >
            {children}
        </Box>
    );
}

export default function SignUp(){

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    
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
            const response = await fetch('https://localhost:8000/signup', {
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
                <Box sx = {{...sign_up}}> Sign up </Box>
                
                <Box sx = {{...email_password}}> Email </Box>
                <TextField 
                    sx = {{...textfield}}
                    size = "small"
                    fullWidth
                    required
                >
                
                </TextField>
                
                <Box sx = {{...email_password}}> Password </Box>
                <TextField
                    sx = {{...textfield}}
                    type={showPassword ? "text" : "password"}
                    size = "small"
                    fullWidth
                    required
                    InputProps={{
                        endAdornment :
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    onChange = {HandleChange}
                >
                </TextField>

                <Center> 
                    <Box sx = {{...term_line_1}}> By clicking Sign up, you agree to </Box> 
                </Center>

                <Center>
                    <Box sx = {{...term_line_2}}>
                        VanityBlock's <Link href = 'localhost:3000' sx = {{...link_term}}>Terms and Conditions</Link>
                    </Box>
                </Center>

                {/*
                <ThemeProvider theme = {theme}>
                    <Button color = "primary" variant = "contained" fullWidth>
                        Sign up
                    </Button>
                </ThemeProvider>
                */}

                <button onClick = {handleSubmit}><img src="/images/sign-up-button.png"></img></button>

                {/*
                <Box>
                    Already have an account? 
                    <Button>
                        Login
                    </Button>
                </Box>
                */}

            </Box>
        </Box>
    );
}