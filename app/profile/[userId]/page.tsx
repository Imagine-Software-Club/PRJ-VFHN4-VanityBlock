'use client';

import React, { useState, useEffect, useRef } from "react";
import '@/app/profile/css/profile.css';
import Image from 'next/image';
import pfp from "@/public/images/founder.png";
import editProfile from "@/public/images/edit_profile.png";
import ListingCard from '@/src/components/ListingCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams } from 'next/navigation';


export default function Page() {
    const [userData, setUserData] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        bio:""
    })

    const { userId } = useParams(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/profile/${userId}`);
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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await fetch(`http://localhost:8000/profile/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw Error('Failed to post event');
            }
        } catch (error) {

            console.error("error");
        }
        
        setFormData(userData.Bio);
        setOpen(false);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/profile/${userId}`);
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
      }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                style={{outline:'none'}}
                            >
                                <Box className="bio-modal">
                                    <form className="bio-form">
                                        <p>Add a Bio</p>
                                        <textarea onChange={handleChange} name="bio" className="bio-input" 
                                        defaultValue = {userData.Bio}
                                        />
                                        <button type="button" onClick={handleSubmit} className="submit-button">Save</button>
                                    </form>
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
                    {userData && 'listings' in userData ? (
                        <ul className="display-listings">{userData.listings.map((id)=><a href={`/listings/${id}`} key={id.toString()}>{id}</a>)}</ul>
                    ) : (
                        <p className="display-listings">No Listings</p>
                    )}
                </div>
            </div>
        </div>
    )
}