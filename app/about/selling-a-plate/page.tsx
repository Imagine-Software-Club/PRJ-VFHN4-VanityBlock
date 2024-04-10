import React from "react";
import SideBar from "@/src/components/SideBar";
import './selling.css';
import CommentSection from "@/src/components/CommentSection";

export default function SellPage() {
  return (
      <div className="container">
        <div className="sidebar">
          <SideBar/>
        </div>
        <main className="content">
        <div className="content-title"> Selling a Plate</div>
        <div className="content-body">
        <h2 className="header">Submit your plate
</h2>
            <p className="text">
                Submit your plate <a href ="/" className = "link-style">here</a> and follow the detailed instructions to get your auction live!
            </p>
        <h2 className="header">We take your input and build out your listing</h2>
            <p className="text">
                Description!            
            </p>
        <h2 className="header">We list it</h2>
            <p className="text">
                Description!          
            </p>
        <h2 className="header">You engage with it</h2>
            <p className="text">
                Engage and answer questions in the comment section.          
            </p>
        </div>
        <CommentSection listingId={"6Fd9KOAGyWA0X2vATDAA"} />
        </main>
      </div>
  );
}