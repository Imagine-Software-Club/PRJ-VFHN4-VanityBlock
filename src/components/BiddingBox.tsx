import * as React from 'react';
import '@/src/styles/biddingbox.css';
import Image from 'next/image';
import {  } from '@mui/icons-material';
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';
import InfoButton from './InfoButton';

export default function BiddingBox(props: any) {
    return (
        <div >
            {props.image ? <Image src={props.icon} alt="Image of the bidding plate"/> : null}

            <p className="title">{props.state} {props.licensePlate} {props.date}</p>

            <FormControl >
                    <TextField 
                        variant="outlined"
                        id="searchBar"
                        InputProps={{
                            
                            style:{
                                color:"#9595a6"
                            }
                        }}
                        placeholder="Search"
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
                    <InfoButton info="Bid"></InfoButton>

                </FormControl>
        </div>
    )
}