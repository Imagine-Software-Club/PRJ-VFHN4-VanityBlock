"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import '@/app/listings/css/listingpage.css';
import Image from "next/image";
import shareButton from "@/public/images/share-button.png";
import InfoButton from "@/src/components/InfoButton";
import clockIcon from "@/public/images/blue_clock.png";
import blueHammer from "@/public/images/blue_hammer.png";
import bidIcon from "@/public/images/bid-icon.png";

export default function ListingPage() {
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const { listingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/listings/${listingId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
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
      }
    };

    fetchData();
  }, [listingId]);

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
            <p className="title">{listingData.title}</p>
            <p className="location">{listingData.location}</p>
          </div>
          <div className="main-photo-container">
            <Image alt="License plate main photo" className="main-photo" width="100" height="100" src={listingData.picture[selectedPhotoIndex]} />
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
            <a className="bid-button">
              <Image src={bidIcon} alt="" width={35} />
              <p>Place Bid</p>
            </a>
          </div>
        </div>
        <div className="right-column">
          <div className="share">
            {/* Add your shareable component here */}
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
    <p>{listingData.state}</p>
    <br></br>
    <h3><b>Year Issued</b></h3>
    <p>{listingData.year}</p>
    <br></br>
    <h3><b>Main Color</b></h3>
    <p>{listingData.mainColor}</p>
    <br></br>
    <h3><b>Accent Color</b></h3>
    <p>{listingData.accentColor}</p>
    <br></br>
</div>

      <br></br>
        <br></br>
    </div>

    
  );
}
