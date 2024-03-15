import React from "react";
import SideBar from "@/src/components/SideBar";
import './what-is-vanity-block.css';
import Image from "next/image";
import check_icon from "@/public/images/check_icon.png";

export default function WhatIsPage() {
  return (
      <div className="container">
        <div className="sidebar">
          <SideBar/>
        </div>
        <main className="content">
        <div className="content-title"> What is Vanity Block?</div>
        <div className="content-body">
            <div className="bullet-point">
                <div className="header-box">
                    <Image src={check_icon} alt="Check" className="icon"/>
                    <h2 className="header">Sell your plate with us</h2>
                </div>
                <p className="description">
                    We will sell any sort of license plate you have. If you got it, someone will want it. 
                </p>
            </div>
            <div className="bullet-point">
                <div className="header-box">
                    <Image src={check_icon} alt="Check" className="icon"/>
                    <h2 className="header">Competitive selling fees</h2>
                </div>
                <p className="description">
                    Vanity Block only charges $1 to list a plate with us and a 5% buyer’s premium when you buy one!
                </p>
            </div>
            <div className="bullet-point">
                <div className="header-box">
                    <Image src={check_icon} alt="Check" className="icon"/>
                    <h2 className="header">7 Day Auctions</h2>
                </div>
                <p className="description">
                    Your listing will be live for 7 days.            
                </p>
            </div>
            <div className="slogan"> A one stop shop to buy license plates! </div>
        </div>
        </main>
      </div>
  );
}