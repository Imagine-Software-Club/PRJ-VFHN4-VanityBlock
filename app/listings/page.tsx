'use client';

import React from "react";
import {useState} from 'react';
import { useParams } from 'next/navigation';
import '@/app/listings/css/listingpage.css';
import Image from "next/image";
import shareButton from "@/public/images/share-button.png";
import InfoButton from "@/src/components/InfoButton";
import clockIcon from "@/public/images/blue_clock.png";
import blueHammer from "@/public/images/blue_hammer.png";
import bidIcon from "@/public/images/bid-icon.png";




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
  const [yearIssued, setYearIssued] = useState(0);
  const [state, setState] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const [zip, setZip] = useState(0);
  const [stateAbbr, setStateAbbr] = useState("");
  const [city, setCity] = useState("");
  // const [photos, setPhotos] = useState([] as string[]);
  jsonRes.then(data => ({
    data: data
  })
  ).then(jsonRes => {
    setLicensePlate(jsonRes.data["LicensePlate"]);
    setYearIssued(jsonRes.data["YearIssued"]);
    setState(jsonRes.data["State"]);
    setStartingPrice(jsonRes.data["StartingPrice"]);
    setPhoto(jsonRes.data["Picture"][0]);
    setZip(jsonRes.data["Zip"]);
    setStateAbbr(jsonRes.data["StateAbbr"]);
    setCity(jsonRes.data["City"]);



    
  });

  
return(
  <div className="container">
      <div className="listing-info">
          <div className="main-content">
              <div className="info">
                  <div className="title">
                    <p>{state}</p> 
                    <p>{licensePlate}</p>
                    <p>{yearIssued}</p>
                  </div>
                  <div className="location">
                    <p>{city}</p>
                    <p>{stateAbbr},</p>
                    <p>{zip}</p>
                  </div>
              </div>
              <div className="main-photo-container">
                  <img alt="License plate main photo" className="main-photo" src={photo}/>
              </div>
              <div className="bid-info">
                  <a>
                      <InfoButton icon={clockIcon}info={"12:54:52"}/>
                  </a>
                  <a>
                  <InfoButton icon={blueHammer}info={"$ " + startingPrice.toFixed(2)}/>
                  </a>
                  <a>
                      <InfoButton info={"# " + 29}/>
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
                  <div className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
                  </div>
                  <div className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
                  </div>
                  <div className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
                  </div>
                  <div className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
                  </div>
                  <div className="photo">
                    <img alt="other photo" className="small-photo" src={photo}/>
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