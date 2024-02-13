"use client";
import React,{useState} from "react";



import { Box, FormControl,InputAdornment,Select, TextField,SelectChangeEvent } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import SearchIcon from '@mui/icons-material/Search';
import { BorderColor } from "@mui/icons-material";



export default function MainMenuHeader() {
    const [age, setAge] = useState('Past');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
        <Grid container columnGap={{ md:3, sm:5}}
        justifySelf="center"
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        >
            <Grid md={2} sm={2} xs={12} >
                <FormControl fullWidth>
                    <Select
                        autoWidth
                        defaultValue={"Live"}
                        sx={{borderColor:"#1c1c1d"}}
                    
                    >
                        <option value={"Live"}>Live Auctions</option>
                        <option value={"Past"}>Past Auctions</option>
                    </Select>
                </FormControl>
            </Grid>
            <Grid md={1.5} sm={.5} xs={0}>

            </Grid>
            <Grid md={3} sm={3} xs={12}>
                <FormControl fullWidth>
                    <TextField 
                        variant="outlined"
                        id="searchBar"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <SearchIcon htmlColor="#222e61"></SearchIcon>
                                </InputAdornment>
                            ),
                            style:{
                                color:"#9595a6"
                            }
                        }}
                        placeholder="Search"
                    />      
                </FormControl>
            </Grid>
            <Grid md={1} sm={2} xs={12} fontSize={"medium"}>
                <FormControl fullWidth>
                    <Select
                        autoWidth
                        defaultValue={"State"}
                        
                    >
                        <option value={"State"}>State</option>
                    </Select>
                </FormControl>
            </Grid>

            <Grid md={1.5} sm={2} xs={12}>
                <FormControl fullWidth>
                    <Select
                    autoWidth
                    defaultValue={"Ending Soon"}>
                        <option value={"Ending Soon"}>Ending Soon</option>
                        <option value={"Ending Last"}>Ending Last</option>
                        <option value={"Lowest Bid"}>Lowest Bid</option>
                        <option value={"Highest Bid"}>Highest Bid</option>
                        <option value={"Nearest to Me"}>Nearest to Me</option>
                    </Select>
                </FormControl>
            </Grid>            

        </Grid>

    );
  }