"use client";

import React, { useEffect, useState } from 'react';
import '@/src/styles/biddingbox.css'; // Ensure CSS is properly structured for responsiveness
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, IconButton, TextField } from '@mui/material';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/layout";

export default function BiddingBox(props) {
  const [timer, setTimer] = useState(24 * 60 * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [bidData, setBidData] = useState({
    amount: 0,
    listing: props.listing,
    timeDate: "",
    user: "",
    verified: true,
  });

  const updateDictionary = (key, value) => {

    setBidData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/post-bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bidData),
      });

      props.socketBidPlaced(bidData["amount"]);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      props.hideBox();
      // const data = await response.json(); // If you need to use the response data
    } catch (error) {
      console.error('Error posting listing:', error);
    }
  
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const uid = user.uid;

        updateDictionary("user", uid);
        if (bidData.timeDate) fetchData();
      }
    });

    return unsubscribe;
  }, [bidData.timeDate]);

  const submitBid = async (e) => {
    e.preventDefault();
    if (bidData.amount <= props.price) {
      updateDictionary("amount", props.price);
      return;
    }

    const dateISO = new Date().toISOString();
    updateDictionary("timeDate", dateISO);
  };

  return (
    <div className='BiddingBoxContainer'>
      <IconButton aria-label="close" onClick={props.hideBox} style={{ position: 'absolute', right: '10px', top: '10px' }}>
        <CloseIcon/>
      </IconButton>
      {props.icon && <Image src={props.icon} alt="Image of the bidding plate" width={100} height={100} />} {/* Adjust size as needed */}

      <br></br>
      <br></br>
      <p className='center-text'>Current Bid <span className='redFont'>${props.price}</span></p>
      <FormControl>
        <div className='bid-format' style={{ margin: '10px' }}>
          <TextField 
            required
            variant="outlined"
            id="bidAmount"
            type='number'
            onChange={(event) => updateDictionary("amount", event.target.value)}
            placeholder={`Bid $${parseFloat(props.price) + 0.01} or more`}
            fullWidth
          />
          <Button variant="contained" onClick={submitBid} style={{ margin: '10px' }}>
            Bid
          </Button>
        </div>
      </FormControl>
    </div>
  );
}
