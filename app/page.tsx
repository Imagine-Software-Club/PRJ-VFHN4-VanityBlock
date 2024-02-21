import React, {useState} from 'react'
import ListingCard from '@/src/components/ListingCard'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import MainMenuHeader from '@/src/components/MainMenuHeader'
import { Box } from '@mui/material'
import ListingPage from '@/app/listings/page';

  
export default function Homepage() { 

  
  return ( 
    <center>


  <Box>
    <MainMenuHeader/>

    <br></br>
    <br></br>

    <Grid container spacing={4} justifyContent="center">
        {Array.from(Array(12)).map((_, index) => (
          <Grid key={index} item xs={12} sm={4} md={4} lg={4} xl={4}>
            <ListingCard
              name={`Item ${index}`}
              time="Time"
              price="Price"
            />
          </Grid>
        ))}
      </Grid>

  </Box>
  </center>
  );
}