import React from "react";
import './css/listingpage.css';
import Image from "next/image";
import mainPhoto from "@/public/images/PlateExample.jpg";
import shareButton from "./images/share-button.png";
import InfoButton from "@/src/components/InfoButton";
import clockIcon from "@/public/images/blue_clock.png";
import blueHammer from "@/public/images/blue_hammer.png";
import bidIcon from "@/public/images/bid-icon.png";

export default function ListingPage() {
    return(
        <div className="container">
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
                        <a>
                            <InfoButton icon={clockIcon}info={"12:54:52"}/>
                        </a>
                        <a>
                        <InfoButton icon={blueHammer}info={"$ " + 985.57}/>
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
                        <div className="photo"></div>
                        <div className="photo"></div>
                        <div className="photo"></div>
                        <div className="photo"></div>
                        <div className="photo"></div>
                        <div className="photo"></div>
                        <div className="photo"></div>
                        <div className="photo"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}