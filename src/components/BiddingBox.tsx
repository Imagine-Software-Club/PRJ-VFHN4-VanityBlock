"use client"

import React from 'react';
import { useState }  from "react"
import '@/src/styles/biddingbox.css';
import Image from 'next/image';
import {  } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import InfoButton from './InfoButton';
import { formatISO } from 'date-fns';



export default function BiddingBox(props: any) {

  const [timer, setTimer] = React.useState(24 * 60 * 60);
  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Cleanup the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

    const [bidData, setbidData] = useState({
      amount: 0,
      listing: props.listing,
      timeDate: "",
      user: "S7mgDyrVTj39tjpZYbn8",
      verified: true,
    });
    
        // Function to update a specific key within the dictionary
    const updateDictionary = (key, value) => {
      setbidData(prevState => ({
        ...prevState, // Spread the previous state
        [key]: value // Update the value of the specified key
      }));
    };
    
    const submitBid = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior

      if(bidData["amount"] <= props.price){
        return;
      }

      updateDictionary("timeDate",formatISO(new Date()))
      console.log(JSON.stringify(bidData));
      // API stuff goes here
      try {
          const response = await fetch('http://localhost:8000/post-bid', {  // Adjust the URL/port as needed
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(bidData),
          });
    
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          // Handle success response
      } catch (error) {
          console.error('Error posting listing:', error);
          // Handle error
      }
    
    };
    return (
        <div className='BiddingBoxContainer'>
            <Button disableRipple style={{ 
              backgroundColor: 'transparent',
              justifyContent: 'flex-end'
           }}>
              <IconButton aria-label="close" onClick={props.hideBox}>
                <CloseIcon/>
              </IconButton>
            </Button>
            {props.image ? <Image src={props.icon} alt="Image of the bidding plate"/> : null}

            <p className="title">{props.state} {props.licensePlate} {props.date}</p>
            <p className='center-text'>Time Left <span className='redFont'>{formatTime(timer)}</span></p>
            <p className='center-text'>Current Bid <span className='redFont'>{props.price}</span></p>
            <FormControl >
              <div className='bid-format'>
                    <TextField 
                        required
                        variant="outlined"
                        id="searchBar"
                        type='number'
                        
                        
                        onChange={(event)=>{
                          if(event.target.value > props.price){
                            updateDictionary("amount", event.target.value);
                          }
                          else{
                            updateDictionary("amount", 0);
                          }
                        }}
                        InputProps={{
                            style:{
                                color:"#9595a6"
                            }
                        }}
                        inputProps={{
                            step:0.01,
                        }}
                        placeholder={"Bid $" + (props.price+1) +" or more"}
                        sx={{
                            '.MuiOutlinedInput-notchedOutline': {
                              borderColor: '#1c1c1d',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#1c1c1d',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#1c1c1d',
                            },
                            '.MuiSvgIcon-root': {
                              fill: "#1c1c1d !important",                            }
                          }}
                    />
                    <Button style={{ backgroundColor: '#242e5e', color: 'white' }} variant="contained"
                      onClick={submitBid}
                    >
                      Buy
                    </Button>
                </div>

            </FormControl>
        </div>
    )
}