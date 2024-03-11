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

  const {listingId} = useParams();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:8000/listings/${listingId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setListingData(data);

        // Parse endTime to get a Date object, then get the time in milliseconds
        const endTime = new Date(data.endTime).getTime();

        const calculateTimeLeft = () => {
          const now = Date.now(); // Current time in milliseconds
          const timeLeft = endTime - now; // Time left in milliseconds
          return timeLeft / 1000; // Convert time left to seconds
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
  }, []);

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
            <Image alt="License plate main photo" className="main-photo" width = "100" height = "100" src={listingData.picture[selectedPhotoIndex]} />
          </div>
          <div className="bid-info">
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
            
          </div>
          <div className="picture-grid">
            {listingData.picture.map((picture, index) => (
              <div key={index} className={`photo ${index === selectedPhotoIndex ? 'selected' : ''}`} onClick={() => handlePhotoClick(index)}>
                <Image alt={`Other photo ${index + 1}`} width = "100" height = "100" className="small-photo" src={picture} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}