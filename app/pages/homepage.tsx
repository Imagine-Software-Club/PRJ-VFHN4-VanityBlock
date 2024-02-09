import React from 'react'
import ListingCard from '@/src/components/ListingCard'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import MainMenuHeader from '@/src/components/MainMenuHeader'

  
export default function Homepage() { 
  return ( 

  <div>
    <MainMenuHeader/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    
    <Grid container spacing={{ xs: 4, md: 4, lg: 4 }} >
      {Array.from(Array(12)).map((_, index) => (
        <Grid  key={index} xs={4}>
          <ListingCard name={index} ></ListingCard>
        </Grid>
      ))}
    </Grid>
  </div>
  </div>


    
  ) 
}