"use client";
import React, { useState } from "react";

import {
    Box,
    FormControl,
    InputAdornment,
    Select,
    TextField,
    SelectChangeEvent,
    MenuItem,
} from "@mui/material";

import Grid from '@mui/material/Unstable_Grid2/Grid2'
import SearchIcon from '@mui/icons-material/Search';
import { BorderColor } from "@mui/icons-material";

export default function MainMenuHeader( {onSearch} ) {
    const [searchInput, setSearchInput] = useState('');
    const [state,setState] = useState('All');
    const handleChange = (e) => {
        //Updates search value
        setSearchInput(e.target.value);
    };
    
    const handleStateChange = (newValue) => {
      setState(newValue);
    }

    const onEnter = async () => {
      console.log("ENTER TEST");
      console.log(state);
      onSearch(searchInput,state);
    };
    

    const handleSearch = () => {
        // Implement your search logic here
        console.log('Searching...');
    };

    return (
        <Grid
            container
            columnGap={{ md: 3, sm: 5 }}
            justifySelf="center"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
        >
            <Grid md={2} sm={2} xs={12}>
                <FormControl fullWidth>
                    <Select
                        autoWidth
                        defaultValue={"Live"}
                        sx={{ borderColor: "#1c1c1d" }}
                      
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
                                <InputAdornment position="start">
                                    <SearchIcon htmlColor="#222e61"></SearchIcon>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <BorderColor
                                        htmlColor="#222e61"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleSearch}
                                    />
                                </InputAdornment>
                            ),
                            style: {
                                color: "#9595a6"
                            }
                        }}
                        placeholder="Search"
                        sx={{
                          color: "#1c1c1d",
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
                            fill: "#1c1c1d !important",
                          }
                        }}
                        value={searchInput}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            onEnter();
                            event.preventDefault();
                          }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid md={1} sm={2} xs={12} fontSize={"medium"}>
                <FormControl fullWidth>
                    <Select
                        autoWidth
                        value={state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        sx={{
                          color: "#1c1c1d",
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
                            fill: "#1c1c1d !important",
                          }
                        }}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Michigan">Michigan</MenuItem>
                      <MenuItem value="New York">New York</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid md={1.5} sm={2} xs={12}>
                <FormControl fullWidth>
                  
                    <Select
                        autoWidth
                        defaultValue={"Ending Soon"}
                        onChange={handleChange}
                        sx={
                          {
                            color: "#1c1c1d",
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
                              fill: "#1c1c1d !important",
                            }
                          }
                        }
                    >
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
