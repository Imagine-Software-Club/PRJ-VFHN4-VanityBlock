'use client';

import React, { useState, useEffect } from "react";
import '@/app/profile/css/profile.css';
import Image from 'next/image';
import pfp from "@/public/images/founder.png";
import editProfile from "@/public/images/edit_profile.png";
import ListingCard from '@/src/components/ListingCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    }, [])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <div className="profile-info">
                    <div className="left-info">
                        {/* {userData && 'Picture' in userData ? (
                            <Image alt="Profile picture" className="profile-pic" src={userData.Picture}/>
                        ) : (
                            <Image alt="Profile picture" className="profile-pic" src={pfp}/>
                        )} */}
                        <Image alt="Profile picture" className="profile-pic" src={pfp}/>
                        <p>Joined</p>
                        {userData && 'JoinDate' in userData ? (
                            <p>{userData.JoinDate}</p>
                        ) : (
                            <p>Join Date Not Found</p>
                        )}
                    </div>
                    <div className="right-info">
                        <div className="username-edit-button">
                            {userData && 'username' in userData ? (
                                <p className="username">{userData.username}</p>
                            ) : (
                                <p className="username">Username Not Found</p>
                            )}
                            
                            <Image alt="Edit button" onClick={handleOpen} className="edit-profile" src={editProfile}/>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="bio-modal">
                                    <p>Edit Bio</p>
                                </Box>
                            </Modal>
                        </div>
                        <div className="bio">
                            {userData && 'Bio' in userData ? (
                                <p>{userData.Bio}</p>
                            ) : (
                                <p>Bio Is Empty</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="auction-history">
                    <p>Plates Auctioned</p>
                    <ListingCard
                        name={'Bruh'}
                    />
                    
                </div>
            </div>
        </div>
    )
}