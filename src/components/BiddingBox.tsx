"use client"

import React from 'react';
import { useState }  from "react"
import '@/src/styles/biddingbox.css';
import Image from 'next/image';
import {  } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';
import InfoButton from './InfoButton';
import { formatISO } from 'date-fns';



export default function BiddingBox(props: any) {


    const [bidData, setbidData] = useState({
      amount: "",
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
            {props.image ? <Image src={props.icon} alt="Image of the bidding plate"/> : null}

            <p className="title">{props.state} {props.licensePlate} {props.date}</p>
            <p>Time Left <span>{props.timeLeft}</span></p>
            <p>Current Bid <span>{props.price}</span></p>
            <FormControl className='bid-format'>
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
                    <Button className="buy-button" variant="contained"
                      onClick={submitBid}
                    >
                      Buy
                    </Button>

                </FormControl>
        </div>
    )
}