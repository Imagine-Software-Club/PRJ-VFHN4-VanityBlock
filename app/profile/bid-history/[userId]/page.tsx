'use client';

import React, { useState, useEffect } from "react";
import '@/app/profile/css/profile.css';
import '@/app/profile/bid-history/bid-history.css';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
            <div className="bid-history-container">
                <p className="bid-history-header">Bid History</p>
                {userData && 'bids' in userData ? (
                        <ul className="display-bids">{userData.bids.map((id)=><a href={`/listings/${id}`} key={id.toString()}>{id}</a>)}</ul>
                    ) : (
                        <p className="display-bids">No Bids</p>
                    )}
            </div>
        </div>
    )
}