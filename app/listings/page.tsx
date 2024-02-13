import React from "react";
import './style.css';
import Image from "next/image";
import mainPhoto from './images/listings-image-holder.jpg';


export default function ListingPage() {
    return(
        <div className="container">
            <div className="header">Header Placeholder</div>
            <div className="listing-info">
                <div className="main-content">
                    <div className="info">
                        <p className="title">Michigan DRS2342 2018</p>
                        <p className="location">Fremont MI, 49412</p>
                    </div>
                    <div className="main-photo-container">
                        <Image alt="License plate main photo" className="main-photo" src={mainPhoto}/>
                    </div>
                    <div className="bid-info">
                    </div>
                </div>
                <div className="right-column">
                    <div className="share">share</div>
                    
                    
                </div>
            </div>
        </div>
    );
}