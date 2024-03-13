'use client';

import React from "react";
import {useState} from 'react';
import { useParams } from 'next/navigation';
import '../css/listingpage.css';
import Image from "next/image";
import shareButton from "../images/share-button.png";
import InfoButton from "@/src/components/InfoButton";
import clockIcon from "@/public/images/blue_clock.png";
import blueHammer from "@/public/images/blue_hammer.png";
import bidIcon from "@/public/images/bid-icon.png";
// import { getAuth, onAuthStateChanged } from "firebase/auth";


async function getData() {
  const {listingId} = useParams();
  const res = await fetch(`http://localhost:8000/listings/${listingId}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default function Page() {
  const jsonRes = getData();
  const [licensePlate, setLicensePlate] = useState("");
  const [yearIssued, setYearIssued] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const [zip, setZip] = useState(0);
  // const [stateAbbr, setStateAbbr] = useState("");
  // const [city, setCity] = useState("");
  // const [photos, setPhotos] = useState([] as string[]);
  jsonRes.then(data => ({
    data: data
  })
  ).then(jsonRes => {
    setLicensePlate(jsonRes.data["plateNumber"]);
    setYearIssued(jsonRes.data["yearIssued"]);
    setState(jsonRes.data["stateIssued"]);
    setPrice(jsonRes.data["price"]);
    setPhoto(jsonRes.data["picture"][0]);
    setZip(jsonRes.data["zip"]);

    // var photos = [];
    // for (var i = 0; jsonRes.data["Picture"].length; i++) {
    //   setPhotos([...photos, jsonRes.data["Picture"][i]]);
    // }
  });

  const formattedPrice = isNaN(price) ? "Invalid Price" : `$${price.toFixed(2)}`;

  const [timer, setTimer] = React.useState(24 * 60 * 60); // 24 hours in seconds

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Cleanup the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });
return(
  <div className="container">
      <div className="listing-info">
          <div className="main-content">
              <div className="info">
                  <div className="title">
                    <p>{state}</p> 
                    <p>{licensePlate}</p>
                    <p>{yearIssued.slice(0,4)}</p>
                  </div>
                  <div className="location">
                    <p>
                      {}
                    </p>
                    {/* <p>{city}</p>
                    <p>{stateAbbr},</p>
                    <p>{zip}</p> */}
                  </div>
              </div>
              <div className="main-photo-container">
                  <img alt="License plate main photo" className="main-photo" src={photo}/>
              </div>
              <div className="bid-info">
                  <a>
                      <InfoButton icon={clockIcon}info={formatTime(timer)}/>
                  </a>
                  <a>

                  <InfoButton icon={blueHammer} info={formattedPrice} />
                  </a>
                  <a>
                      <InfoButton info={"# " + 0}/>
                  </a>
                  <a className="bid-button">
                      <Image src={bidIcon} alt="" width={35}/>
                      <p>Place Bid</p>
                  </a>
              </div>
          </div>
          <div className="right-column">
              <div className="share">
                  <a className="share-link">
                      <Image src={shareButton} alt="Share button" className="share-icon"/>
                  </a>
              </div>
              <div className="picture-grid">
                  <a className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
                  </a>
                  <a className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
                  </a>
                  <a className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
                  </a>
                  <div className="photo">
                  </div>
                  <div className="photo">
                  </div>
                  <div className="photo">
                  </div>
                  <div className="photo">
                  </div>
                  <div className="photo">
                  </div>
              </div>
          </div>
      </div>
  </div>
);
}