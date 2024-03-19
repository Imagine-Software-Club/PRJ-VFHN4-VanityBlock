import React from "react";
import SideBar from "@/src/components/SideBar";
import './buying.css';

export default function BuyPage() {
  return (
      <div className="container">
        <div className="sidebar">
          <SideBar/>
        </div>
        <main className="content">
        <div className="content-title"> Buying a Plate</div>
        <div className="content-body">
        <h2 className="header">Register to bid</h2>
            <p className="text">
                Not registered yet? <a href = "/" className = "link-style">Click here</a> or the profile logo in the top right!
            </p>
        <h2 className="header">Look through listings</h2>
            <p className="text">
                Vanity Block offers a vast array of license plates to cater to your likings.            
            </p>
        <h2 className="header">Choose a plate</h2>
            <p className="text">
                Click on the listing of your choice and review the detailed listing that we offer.            
            </p>
        <h2 className="header">Place a bid</h2>
            <p className="text">
                Place a bid on the listing at the designated <span className = "text-style">“place bid”</span> button.            
            </p>
        <h2 className="slogan"> Keep an eye on the listing and bid until you win! </h2>
        </div>
        </main>
      </div>
  );
}