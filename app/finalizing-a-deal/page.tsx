import React from "react";
import SideBar from "@/src/components/SideBar";
import './final.css';

export default function FinalizePage() {
  return (
      <div className="container">
        <div className="sidebar">
          <SideBar/>
        </div>
        <main className="content">
        <div className="content-title"> Finalizing a deal </div>
        <div className="content-body">
        <h2 className="header">Contact the seller </h2>
            <p className="text">
                Contact information for both buyers and sellers will be provided upon the <strong> auction ending</strong>.
            </p>
        <h2 className="header"> Pay </h2>
            <p className="text">
                Buyers are expected to pay the seller within <strong> a week of sale</strong>.
            </p>
        </div>
        </main>
      </div>
  );
}