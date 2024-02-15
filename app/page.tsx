import React, {useState} from 'react'
import ListingCard from '@/src/components/ListingCard'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import MainMenuHeader from '@/src/components/MainMenuHeader'
import { Box } from '@mui/material'
import ListingPage from '@/app/listings/page';

  
export default function Homepage() { 

  
  return ( 
  <Box
  >
    <MainMenuHeader/>
    <Grid
        container       
        justifyContent="center"
        alignItems="center"
      >
        {Array.from(Array(12)).map((_, index) => (
          <Grid  key={index} xs={4}>
            <ListingCard name={index} time = {"Time Test"} price = {"Price Test"} justifyContent="center" alignItems="center" ></ListingCard>
          </Grid>
        ))}
      </Grid>

  </Box>


    
  ) 
}