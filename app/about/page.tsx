import React from "react";
import SideBar from "@/src/components/SideBar";
import './about.css';
import Image from "next/image";
import founder from "@/public/images/founder.png";
import founder_shadow from "@/public/images/founder_shadow.png";

export default function AboutPage() {
  return (
      <div className="container">
        <div className="sidebar">
          <SideBar/>
        </div>
        <main className="content">
        <div className="content-title"> About Vanity Block</div>
        <div className="content-body">
          <div className="images-container">
            <Image src={founder} alt="Founder" className="image-top"/>
            <Image src={founder_shadow} alt="Founder Shadow" className="image-bottom"/>
          </div>
          <div className="text-content">
            <h2 className="text-3xl font-bold mb-6 text-black-800 text-center">Our Story</h2>
            <p className="mb-4 text-xl">
                  Auction business is an industry that our founder, Kristian Trajkovski, has
                  engulfed himself in for much of his life. As a kid, he and his dad would attend
                  used car auctions in the Metro Detroit area. This passion carried all the way to
                  post grad life, where he worked for Carvana as a buyer from wholesale car actions.
                  Kris knew the power of the digital auction platform and wanted to create a marketplace
                  for something that has never existed. At the same time, he grew a fascination for car
                  spotting and noticed the popularity for custom and unique license plates. With all this
                  in mind, he wanted to bring the world a secure and user-friendly platform to exchange
                  any sort of license plate. Hence, the birth of Vanity Block!
              </p>
          </div>
        </div>
        </main>
      </div>
  );
}


