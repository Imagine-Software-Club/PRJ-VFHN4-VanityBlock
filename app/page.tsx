'use client'

import React, { useState, useEffect } from 'react';
import ListingCard from '@/src/components/ListingCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MainMenuHeader from '@/src/components/MainMenuHeader';
import { Box } from '@mui/material';
import { CompressOutlined } from '@mui/icons-material';
import { socket } from "./socket";

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
  
  const [allListings, setAllListings] = useState({});
  //Added
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const [dataPulled,setDataPulled] = useState(false);
  const [searchVal,setSearchVal]  = useState("");
  const [stateVal,setStateVal]    = useState("All");
  const onSearch = async (searchInput,state) => {
    setIsSearchTriggered(true);
    setSearchVal(searchInput);
    setStateVal(state);

    console.log(searchVal);

  };
  

  useEffect(() => {

    Object.keys(allListings).map((listing) => 
        socket.emit("join_room", { listingID: allListings[listing]["id"] }
    ));

    function updateBid(data) {
      console.log(allListings);
      
      setAllListings(prevDict => {
        //updates just the price of the new bid
        return {
          ...prevDict,
          [data.listingId]: {
            ...prevDict[data.listingId],
            ["price"]: data.price,
          },
        };

      });
      
      
    }
  
    socket.on("update_bid", updateBid);
  
    return () => {

      Object.keys(allListings).map((listing) => 
        socket.emit("leave_room", { listingID: allListings[listing]["id"] }
      ));
      socket.off("update_bid", updateBid);
    };
  }, [dataPulled]);

  useEffect(() => {

    const fetchData = async () => {
      let fetchOutput;
      if (!isSearchTriggered) {
        fetchOutput= await getAllListings();
        console.log(fetchOutput);
        
      } else {
        fetchOutput = await FilterListings(searchVal,stateVal);
        console.log(fetchOutput);
        
      }
      return fetchOutput;

    };

    fetchData().then((data) => {
      let dict = {};
      data["Listings"].forEach((row) =>{
        dict[row["id"]] = row;
      });
      
      setAllListings(dict);
      setDataPulled(true);
      
      
    });

    
  }, [isSearchTriggered,searchVal,stateVal]);

  return (
    <center>
      <Box>
        <MainMenuHeader onSearch={onSearch} />
        <br /><br />
        <Grid container spacing={4} justifyContent="center">
          {Object.keys(allListings).map((listing, index) => (
            // Adjust grid sizing here for responsive behavior
            <Grid key={index} item xs={12} sm={6} md={4}>
              <ListingCard
                name={allListings[listing]["plateNumber"]}
                endTime={allListings[listing]["endTime"]}
                price={allListings[listing]["price"]}
                id={allListings[listing]["id"]}
                picture={allListings[listing]["picture"] && allListings[listing]["picture"][0] ? allListings[listing]["picture"][0] : "defaultImageURL"}
                description={allListings[listing]["description"]}
                flaws={allListings[listing]["flaws"]}
                mainColor={allListings[listing]["mainColor"]}
                accentColor = {allListings[listing]["accentColor"]}
                year = {allListings[listing]["yearIssued"]}
                state = {allListings[listing]["stateIssued"]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </center>
  );
};

export default Homepage;
