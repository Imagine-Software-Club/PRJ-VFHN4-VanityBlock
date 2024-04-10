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
import {Theme, useTheme, ThemeProvider, createTheme} from "@mui/material/styles";

/*
const Item_Height = 48;
const Item_Padding_Top = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: Item_Height * 4.5 + Item_Padding_Top,
      width: 250,
    }
  }
}

const allAuctionOptions = [
  'Past Auctions',
  'Live Auctions',
];

function getStyles(name: string, option: readonly string[], theme: Theme){
  return {
    fontWeight:
      option.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

function SelectAuction(){
  const theme = useTheme();
  const [filterOption, setFilterOption] = useState<string[]>([]);
}
*/

const sx_select = {
    color: "#1c1c1d",
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#1c1c1d',
      // border: '2px solid',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1c1c1d',
      // border: '2px solid',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1c1c1d',
      // border: '2px solid',
    },
    '.MuiSvgIcon-root': {
      fill: "#1c1c1d !important",
    },
    '&.Mui-focused .MuiInputBase': {
      borderColor: '#1c1c1d',
      // border: '2px solid',
    },
    '.MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#1c1c1d',
        // border: '2px solid',
      },
      'fieldset': {
        borderCoslor: '#1c1c1d',
        // border: '2px solid',
      },
      
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1c1c1d',
        // border: '2px solid',
      }
      
    },
}

/*
const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    border: '2px solid',
                    color: '#1c1c1d',
                    focused: {
                        border: '2px solid',
                        borderColor: '#1c1c1d',
                    },
                },
                focused: {
                    notchedOutline: {
                        borderColor: '#1c1c1d',
                        border: '2px solid',
                    },
                    border: '2px solid',
                    borderColor: '#1c1c1d',
                },
                root: {
                  notchedOutline: {
                      borderColor: "red",
                      focused: {
                          borderColor: '#1c1c1d',
                      }
                  },
                  "&.Mui-focused": {
                      notchedOutline: {
                          borderColor: '#1c1c1d',
                      }
                  }
                }
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    fontWeight: 700,
                    fontSize: '1rem',
                },
            }
        },
    }
});
*/

export default function MainMenuHeader( {onSearch} ) {
    const [searchInput, setSearchInput] = useState('');
  
    const [time, setTime] = useState('Live Auctions');
    const [state, setState] = useState('All');
    const [sort, setSort] = useState('Ending Soon');

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    }

    const handleSearch = async () => {
        console.log("Start searching...");
        onSearch(searchInput, time, state, sort);
    };
    
    const onEnter = async () => {
        console.log("ENTER TEST");
        console.log(state);
        onSearch(searchInput, time, state, sort);
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
                        defaultValue={"Live Auctions"}
                        sx={sx_select}
                        onChange={handleTimeChange}
                        variant = "outlined"
                    >
                        <MenuItem value={"Live Auctions"}>Live Auctions</MenuItem>
                        <MenuItem value={"Past Auctions"}>Past Auctions</MenuItem>
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
                        sx={sx_select}
                        value={searchInput}
                        onChange={handleSearchChange}
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
                        defaultValue={"State"}
                        onChange={handleStateChange}
                        sx={sx_select}
                    >
                        <MenuItem value={"State"} disabled>State</MenuItem>
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"New York"}>New York</MenuItem>
                        <MenuItem value={"California"}>California</MenuItem>
                        <MenuItem value={"Michigan"}>Michigan</MenuItem>
                        {/* Add more states as needed */}
                    </Select>
                </FormControl>
            </Grid>

            <Grid md={1.5} sm={2} xs={12}>
                <FormControl fullWidth>
                    <Select
                        autoWidth
                        defaultValue={"Ending Soon"}
                        onChange={handleSortChange}
                        sx={sx_select}
                    >
                        <MenuItem value={"Ending Soon"}>Ending Soon</MenuItem>
                        <MenuItem value={"Ending Last"}>Ending Last</MenuItem>
                        <MenuItem value={"Lowest Bid"}>Lowest Bid</MenuItem>
                        <MenuItem value={"Highest Bid"}>Highest Bid</MenuItem>
                        {/*<MenuItem value={"Nearest to Me"}>Nearest to Me</MenuItem>*/}
                    </Select>
                </FormControl>
            </Grid>

        </Grid>
    );
}
