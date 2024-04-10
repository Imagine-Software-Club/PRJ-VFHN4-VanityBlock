'use client';

import React, { useState, useEffect } from "react";
import '@/app/profile/css/profile.css';
import '@/app/profile/settings/settings.css';
import registerButton from "@/public/images/register-to-bid.png";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Button from '@mui/material/Button';
import { signOut, getAuth, updateEmail } from "firebase/auth";
import {auth} from "@/app/layout";

export default function Page() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams(); 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/profile/settings/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const auth = getAuth();
    const user = auth.currentUser;

    const handleChangeEmail = () => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // ...
            updateEmail(auth.currentUser, "user@example.com").then(() => {
                // Email updated!
                // ...
                }).catch((error) => {
                // An error occurred
                // ...
                });
          } else {
            // No user is signed in.
          }
        
    }
    

    return (
        <div className="container">
            <div className="side-bar">
                <a href={`/profile/${userId}`}>
                    <p>Profile</p>
                </a>
                <a href={`/profile/bid-history/${userId}`}>
                    <p>Bid History</p>
                </a>
                {/* <a href="">
                    <p>My Comments</p>
                </a>
                <a href="">
                    <p>My Listings</p>
                </a> */}
                <a href={`/profile/settings/${userId}`}>
                    <p>Settings</p>
                </a>
                
            </div>
            <div className="main-content">
                <div className="settings">
                    <div className="header">
                        <p>Settings</p>
                    </div>
                    <div className="info-row">
                        <div className="email-password-header">
                            <p>Email</p>
                            <p>Password</p>
                        </div>
                        <div className="user-email-password">
                            {userData && 'Email' in userData ? (
                                <p>{userData.Email}</p>
                            ) : (
                                <p>No Email Found</p>
                            )}
                            {userData && 'Password' in userData ? (
                                <p>{userData.Password[0]}{"*".repeat(10)}{userData.Password.slice(-1)}</p>
                            ) : (
                                <p>No Password Found</p>
                            )}
                        </div>
                        <div className="change-email-password">
                            <p className="change-email-password-button"onClick={handleChangeEmail}>Change Email</p>
                            <p className="change-email-password-button">Change Password</p>
                        </div>
                    </div>
                    {/* <div className="sub-header">
                        <p>Payment</p>
                    </div>
                    <div className="info-row">
                        <Image alt="Edit button" className="register-button" src={registerButton}/>
                    </div>
                    <div className="sub-header">
                        <p>Notifications</p>
                    </div> */}
                    <Button style={{fontSize:'15pt'}}href={'/login'}onClick={handleSignOut}>Sign Out</Button>
                </div>
            </div>
        </div>
    )
}