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

async function SearchListings(searchInput, time, state, sort) {
  console.log(searchInput)
  console.log(time)
  console.log(state);
  console.log(sort);
  const res = await fetch(`http://localhost:8000/listings/filtered?query=${encodeURIComponent(searchInput)}&time=${encodeURIComponent(time)}&state=${encodeURIComponent(state)}&sort=${encodeURIComponent(sort)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch filtered data");
  }
  console.log(res);
  return res.json();  
}

const Homepage = () => {

  const [allListings, setAllListings] = useState([]);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [searchVal,setSearchVal] = useState("");
  const [timeVal, setTimeVal] = useState("Live Auctions");
  const [stateVal,setStateVal] = useState("All");
  const [sortVal, setSortVal] = useState("Ending Soon");
  
  const onSearch = async (searchInput, time, state, sort) => {
    setIsSearchTriggered(true);
    setSearchVal(searchInput);
    setTimeVal(time);
    setStateVal(state);
    setSortVal(sort);
    // console.log(searchVal);
  };

  useEffect(() => {
    const fetchData = async () => {

      if (!isSearchTriggered) {
        const upcomingData = await getAllListings();
        console.log(upcomingData);
        setAllListings(upcomingData["Listings"]);
      } else {
        const upcomingData = await SearchListings(searchVal, timeVal, stateVal, sortVal);
        console.log(upcomingData);
        setAllListings(upcomingData["Listings"]);
      }
    };
    fetchData();
  }, [isSearchTriggered, searchVal, timeVal, stateVal, sortVal]);

  return (
    <center>
      <Box>
        <MainMenuHeader onSearch = {onSearch}/>
        <br /><br />
        <Grid container spacing={4} justifyContent="center">
          {allListings.map((listing, index) => (
            // Adjust grid sizing here for responsive behavior
            <Grid key={index} xs={12} sm={6} md={4}>
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
