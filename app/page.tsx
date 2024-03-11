'use client'

import React, { useState, useEffect } from 'react';
import ListingCard from '@/src/components/ListingCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MainMenuHeader from '@/src/components/MainMenuHeader';
import { Box } from '@mui/material';

async function getAllListings() {
  const res = await fetch("http://127.0.0.1:8000/listings");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Homepage = () => {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const upcomingData = await getAllListings();
      setAllListings(upcomingData["Listings"]);
    };
    fetchData();
  }, []);

  return (
    <center>
      <Box>
        <MainMenuHeader />
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

              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </center>
  );
};

export default Homepage;
