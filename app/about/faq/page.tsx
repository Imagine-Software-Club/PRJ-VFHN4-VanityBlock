import React from "react";
import SideBar from "@/src/components/SideBar";
import './faq.css';

export default function FAQPage() {
  return (
      <div className="container">
        <div className="sidebar">
          <SideBar/>
        </div>
        <main className="content">
        <div className="content-title"> Frequenly Asked Questions</div>
        <div className="content-body">
        <h2 className="header">Can I sell my plate if I'm still using it?</h2>
            <p className="text">
                Yes, you can list your plate at any time. If the plate is still in use, just indicate that in the listing details.
            </p>
        <h2 className="header">Do I need to own a plate to buy one?</h2>
            <p className="text">
                No, anyone can purchase a plate. You do not need to own a particular plate to buy one on Vanity Block.
            </p>
        <h2 className="header">Is it possible to exchange plates directly?</h2>
            <p className="text">
                Instead of a direct exchange, Vanity Block operates as an auction marketplace. You can list your plate for sale and then use the proceeds to buy another.
            </p>
        </div>
        </main>
      </div>
  );
}