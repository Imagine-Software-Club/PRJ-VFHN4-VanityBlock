"use client";
import React from "react";
import Link from "next/link";
import "@/src/styles/navbar.css";
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from "@/app/layout";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userActive, setUserActive] = useState(false)
  const [userId, setUserId] = useState("")

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      console.log(`User ID: ${uid}`);
      setUserActive(true)
      setUserId(uid)
    } else {
      console.log('No user is signed in.');
      setUserActive(false)
      setUserId("")
    }
  });
  return (
    <nav className="navbar">
      <div className="nav">
        <a href="/">
          <img src="/images/logo.png" alt="Logo" className="nav-logo" width={80} height={50} />
        </a>
        <a href="/create" className="nav-link">
          <img src="/images/list_your_plates.png" alt="List your plates" className="nav-icon" width={100} height={60} />
        </a>
        <a href="/about" className="nav-link">
          <img src="/images/about.png" alt="About" className="nav-icon" width={50} height={30} />
        </a>
        <div className="rightImages">
          <div className="links">
            <a href="/comments">
              <img src="/images/comments.png" alt="Comments" className="nav-icon" width={30} height={30} />
            </a>
            <a href="/notifications">
              <img src="/images/notifications.png" alt="Notifications" className="nav-icon" width={30} height={30} />
            </a>
            <a href="/signup">
              <img src="/images/signup.png" alt="Signup" className="nav-icon" width={75} height={45} />
            </a>
            {userActive ? (
              <a href={`/profile/${userId}`}>
                <img src="/images/pfp-icon.png" alt="pfp" width={30} height={30}/>
              </a>
            ): null}
          </div>
          <div className="menu-icon">
            <button type="button" className="Menu-Icon" onClick={toggleMenu}>
              <img src="/images/menu.png" alt="Menu" className="nav-icon" width={50} height={50} />
            </button>
          </div>
        </div>
        <div className={`menu-overlay ${showMenu ? "show" : ""}`}>
          <nav>
            <ul id="menu_nav">
              <li> 
                <a href="/comments"> Comments </a>
              </li>
              <li> 
                <a href="/notifications"> Notifications </a>
              </li>
              <li> 
                  <a href="/signup"> Signup </a>
              </li>
            </ul>
                    
          </nav>
        </div>

        
      </div>
    </nav>
  );
};

export default Navbar;
