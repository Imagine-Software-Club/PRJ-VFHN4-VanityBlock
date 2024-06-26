"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'next/navigation';
import '@/app/listings/css/listingpage.css';
import Image from "next/image";
import shareButton from "@/public/images/share-button.png";
import InfoButton from "@/src/components/InfoButton";
import clockIcon from "@/public/images/blue_clock.png";
import blueHammer from "@/public/images/blue_hammer.png";
import bidIcon from "@/public/images/bid-icon.png";
import BiddingBox from "@/src/components/BiddingBox";

import { debug } from "console";
import { socket } from "../../socket";
import CurrentBid from "@/src/components/CurrentBid";
import { Container } from "postcss";
import CommentSection from "@/src/components/CommentSection";

export default function ListingPage() {
  const [listingData, setListingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [bidUpdated, setBidUpdated] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showBiddingBox, setShowBiddingBox] = useState(false); // State to control the visibility of BiddingBox

  const { listingId } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/listings/${listingId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        console.log(data);
        setListingData(data);
  
        const endTime = new Date(data.endTime).getTime();
        const calculateTimeLeft = () => {
          const now = Date.now();
          const timeLeft = endTime - now;
          return timeLeft / 1000;
        };
  
        setTimer(calculateTimeLeft());
  
        const intervalId = setInterval(() => {
          const timeLeft = calculateTimeLeft();
          if (timeLeft > 0) {
            setTimer(timeLeft);
          } else {
            clearInterval(intervalId);
            setTimer(0);
          }
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
        setBidUpdated(false);
      }
    };
  
    fetchData();
  }, [listingId]);


  
  useEffect(() => {
    socket.emit("join_room", { listingID: listingId });
  
    function updateBid(data) {
      setListingData(prevListingData => {
        // Assuming socket data structure matches listingData structure
        return {
          ...prevListingData,
          ...data
        };
      });
      setBidUpdated(true);
    }
  
    socket.on("update_bid", updateBid);
  
    return () => {
      socket.emit("leave_room", { listingID: listingId });
      socket.off("update_bid", updateBid);
    };
  }, []);

  
  function handleBidPrice(amount) {
      const sendBidSocket = () =>{
        socket.emit("bid_placed", {listingID:listingId, amount: amount});
        console.log("button pressed");
      }
      sendBidSocket();
  };
  

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  const toggleBiddingBox = () => {
    setShowBiddingBox(!showBiddingBox);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="listing-info">
        <div className="main-content">
          <div className="info">
          {listingData && 'title' in listingData ? (
            <p className="title">{listingData.title}</p>
              ) : (
                <p className="title">Title Not Found</p>
              )}

              {listingData && 'location' in listingData ? (
                <p className="location">{listingData.location}</p>
              ) : (
                <p className="location"></p>
            )}

          </div>
          <div className="main-photo-container">
            {listingData && 'picture' in listingData ? (
              <Image alt="License plate main photo" className="main-photo" width="100" height="100"src={listingData.picture[selectedPhotoIndex] ?? "NEED TO CHANGE TO NOT FOUND"}/>
            ) : (
              <Image alt="License plate main photo" className="main-photo" width="100" height="100" src={"NEED TO CHANGE TO NOT FOUND"}/>
            )}
          </div>
          <div className="bid-info">
            <br></br>
            <a>
              <InfoButton icon={clockIcon} info={timer > 0 ? formatTime(timer) : 'Ended'} />
            </a>
            <a>
              <InfoButton icon={blueHammer} info={formatPrice(listingData.price)} />
            </a>
            <a>
              <InfoButton info={`# ${listingData.bids.length}`} />
            </a>
            <a className="bid-button" onClick={toggleBiddingBox}>
              <Image src={bidIcon} alt="" width={35} />
              <p>Place Bid</p>
            </a>
          </div>
        </div>
        <div className="right-column">
          <div className="share">
            {/* Share component here */}
          </div>
          <div className="picture-grid">
            {listingData.picture.map((picture, index) => (
              <div key={index} className={`photo ${index === selectedPhotoIndex ? 'selected' : ''}`} onClick={() => handlePhotoClick(index)}>
                <Image alt={`Other photo ${index + 1}`} width="100" height="100" className="small-photo" src={picture} />
              </div>
            ))}
          </div>
          
        </div>
        
        

      </div>

      {showBiddingBox && <BiddingBox hideBox={toggleBiddingBox} listing={listingId} price={listingData.price} icon = {listingData.picture[selectedPhotoIndex]}  socketBidPlaced={handleBidPrice}/>}


      <div className="information-box">
      <center><b><h1>Additional Information</h1></b></center>
    <br></br>
    <h3><b>Description</b></h3>
    <p>{listingData.description}</p>
    <br></br>
    <h3><b>Flaws</b></h3>
    <p>{listingData.flaws}</p>
    <br></br>
    <h3><b>State</b></h3>
    <p>{listingData.stateIssued}</p>
    <br></br>
    <h3><b>Year Issued</b></h3>
    <p>{listingData.yearIssued}</p>
    <br></br>
    <h3><b>Main Color</b></h3>
    <p>{listingData.mainColor}</p>
    <br></br>
    <h3><b>Accent Color</b></h3>
    <p>{listingData.accentColor}</p>
    <br></br>
      </div>

      <center>
      <CurrentBid
      currentBidder="Username1234"
      currentBid={1225}
      seller="OtherUsername5678"
      location="Fremont MI, 49412"
      endingTime="Wed, Jan 9 5:30 PM EST"
      bidsCount={21}
    />
    </center>
    <CommentSection listingId={listingId}/>




    <br></br>
    <br></br>

    </div>

    
  );
}
