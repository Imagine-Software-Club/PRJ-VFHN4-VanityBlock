'use client'

import React, { useState, useEffect } from 'react';
import ListingCard from '@/src/components/ListingCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MainMenuHeader from '@/src/components/MainMenuHeader';
import { Box } from '@mui/material';
import { CompressOutlined } from '@mui/icons-material';

async function getAllListings() {
  const res = await fetch("http://127.0.0.1:8000/listings");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function FilterListings(searchInput,state) {
  
    console.log(state);
    const res = await fetch(`http://localhost:8000/listings/filtered?query=${encodeURIComponent(searchInput)}&state=${encodeURIComponent(state)}`);
    if (!res.ok) {
      throw new Error("Failed to fetch filtered data");
    }

    return res.json();
    
}

const Homepage = () => {
  
  const [allListings, setAllListings] = useState([]);

  //Added
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const [searchVal,setSearchVal]  = useState("");
  const [stateVal,setStateVal]    = useState("All");
  const onSearch = async (searchInput,state) => {
    setIsSearchTriggered(true);
    setSearchVal(searchInput);
    setStateVal(state);

    console.log(searchVal);

  };

  useEffect(() => {
    const fetchData = async () => {

      if (!isSearchTriggered) {
        const upcomingData = await getAllListings();
        console.log(upcomingData);
        setAllListings(upcomingData["Listings"]);
      } else {
        const upcomingData = await FilterListings(searchVal,stateVal);
        console.log(upcomingData);

        setAllListings(upcomingData["Listings"]);
      }

    };
    fetchData();
  }, [isSearchTriggered,searchVal,stateVal]);

  return (
    <center>
      <Box>
        <MainMenuHeader onSearch={onSearch} />
        <br /><br />
        <Grid container spacing={4} justifyContent="center">
          {allListings.map((listing, index) => (
            // Adjust grid sizing here for responsive behavior
            <Grid key={index} item xs={12} sm={6} md={4}>
              <ListingCard
                name={listing["plateNumber"]}
                endTime={listing["endTime"]}
                price={listing["price"]}
                id={listing["id"]}
                picture={listing["picture"] && listing["picture"][0] ? listing["picture"][0] : "defaultImageURL"}
                description={listing["description"]}
                flaws={listing["flaws"]}
                mainColor={listing["mainColor"]}
                accentColor = {listing["accentColor"]}
                year = {listing["yearIssued"]}
                state = {listing["stateIssued"]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </center>
  );
};

export default Homepage;
