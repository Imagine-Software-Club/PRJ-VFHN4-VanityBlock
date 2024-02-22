'use client'
import React, {useState, useEffect} from 'react'
import ListingCard from '@/src/components/ListingCard'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import MainMenuHeader from '@/src/components/MainMenuHeader'
import { Box } from '@mui/material'
import ListingPage from '@/app/listings/page';

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

  return allListings.map((listing: any) => ( 
    <center>
      <Box>
        <MainMenuHeader/>

        <br></br>
        <br></br>

        <Grid container spacing={4} justifyContent="center">
            {Array.from(Array(12)).map((_, index) => (
              <Grid key={index} xs={12} sm={4} md={4} lg={4} xl={4}>
                <ListingCard
                  name = {listing["plateNumber"]}
                  time = {listing["firstName"]}
                  price = {listing["lastName"]}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </center>
  ));
};

export default Homepage;

// export default function Home() {
//   return (
//     <main>
//       <h1> Vanity Block! </h1>
//     </main>
//   );
// }
