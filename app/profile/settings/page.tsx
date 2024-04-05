'use client';

import React, { useState, useEffect } from "react";
import '@/app/profile/css/profile.css';
import '@/app/profile/settings/settings.css';
import registerButton from "@/public/images/register-to-bid.png";
import Image from 'next/image';

export default function Page() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/profile`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    })
    return (
        <div className="container">
            <div className="side-bar">
                <a href="/profile">
                    <p>Profile</p>
                </a>
                <a href="">
                    <p>Bid History</p>
                </a>
                <a href="">
                    <p>My Comments</p>
                </a>
                <a href="">
                    <p>My Listings</p>
                </a>
                <a href="/profile/settings">
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
                            <p>p******d</p>
                        </div>
                        <div className="change-email-password">
                            <p>Change Email</p>
                            <p>Change Password</p>
                        </div>
                    </div>
                    <div className="sub-header">
                        <p>Payment</p>
                    </div>
                    <div className="info-row">
                        <Image alt="Edit button" className="register-button" src={registerButton}/>
                    </div>
                    <div className="sub-header">
                        <p>Notifications</p>
                    </div>
                </div>
            </div>
        </div>
    )
}