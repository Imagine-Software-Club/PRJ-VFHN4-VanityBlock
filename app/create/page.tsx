"use client"

import React from "react";
import './css/create.css';
import { TextField } from '@mui/material'
import { useState }  from "react"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from "@/app/layout";


export default function Create() {
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        zip: "",
        plateNumber: "",
        yearIssued: "",
        stateIssued: "",
        mainColor: "",
        accentColor: "",
        title: "",
        description: "",
        flaws: "",
        price: "",
        postInfo: "",
        picture: []
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData(prevFormData => ({
                ...prevFormData,
                picture: {
                    ...prevFormData.picture,
                    [name]: files[0]
                }
            }));
        }
        else{
            setFormData({
                ...formData, // Spread the existing formValues
                [name]: value // Update the value for the specific input name
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key] instanceof File) {
                formDataToSend.append(key, formData[key]);
            }
            else{
                formDataToSend.append(key, JSON.stringify(formData[key]));
            }
        }

        console.log(formData);

        try {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const token = await user.getIdToken();

                        formData["uid"] = await user.uid;

                        const response = await fetch('http://localhost:8000/listings', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ${token}'
                            },
                            body: JSON.stringify(formData),
                        });
    
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
    
                        const data = await response.json();
                        console.log(data);
                        // Handle success response
                    } catch (error) {
                        console.error('Error posting listing:', error);
                        // Handle error
                    }
                } else {
                    alert("Please Sign In")
                    console.log('No user is signed in.');
                }
            });
        } catch (error) {
            console.error('Error getting user:', error);
            // Handle error
        }
    
        // window.location.reload();
    };
    
    return(
        <div className="wrapper">
            <div className="container">
                <center><p>List your plate</p></center>
                {/* personal information */}
                <div className="information">
                    <p>Personal Information</p>
                    <div className="label">
                        <div className="input_row">
                            <div className="inputs">
                                <p>First Name</p>
                                <input 
                                    name="firstName" 
                                    type="text" 
                                    onChange={handleChange}
                                    value={formData.firstName}
                                />
                            </div>
                            <div className="inputs">
                                <p>Last Name</p>
                                <input 
                                    name="lastName" 
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                />
                            </div>

                        </div>
                        <div className="input_row">
                            <div className="inputs">
                                <p>Email Address</p>
                                <input 
                                    name="email" 
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>
                            <div className="inputs">
                                <p>Zip Code</p>
                                <input 
                                    name="zip" 
                                    type="number"
                                    onChange={handleChange}
                                    value={formData.zip}                                  
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="information">
                    <p>Plate Details</p>
                    <div className="label">
                        <div className="input_row">
                            <div className="inputs">
                                <p>License Plate Number</p>
                                <input 
                                    name="plateNumber" 
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.plateNumber}     
                                />
                            </div>
                            <div className="inputs">
                                <p>Year Issued</p>
                                <input 
                                    name="yearIssued"
                                    type="number"
                                    onChange={handleChange}
                                    value={formData.yearIssued}
                                    min="1980"
                                    max="2030"   
                                />
                            </div>
                            <div className="inputs">
                                <p>State Issued</p>
                                <input 
                                    name="stateIssued" 
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.stateIssued}     
                                />
                            </div>
                        </div>
                        <div className="input_row">
                            <div className="inputs">
                                <p>Main Color</p>
                                <input 
                                    name="mainColor" 
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.mainColor}  
                                />
                            </div>
                            <div className="inputs">
                                <p>Accent Color</p>
                                <input 
                                    name="accentColor" 
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.accentColor}  
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="information">
                    <p>Plate Photos</p>
                    <div className="label">
                        <p>Submit clear photos of both the front and back of the license plate, 
                            as well as close ups of any known flaws or exceptional details. To achieve 
                            the best photo results, put the plate on a blank white background in the 
                            center of the frame.</p>
                    </div>
                    <div className="photos">
                        <div className="inputs">
                            <div className="label">
                                <p>Front</p>
                            </div>
                            <input
                                name="front_image"
                                type="file"
                                className="image_box"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputs">
                            <div className="label">
                                <p>Back</p>
                            </div>
                            <input
                                name="back_image"
                                type="file"
                                className="image_box"
                                onChange={handleChange}
                                />
                        </div>
                        <div className="inputs">
                            <div className="label">
                                <p>Flaws_Details</p>
                            </div>
                            <input
                                name="flaws_image"
                                type="file"
                                className="image_box"
                                onChange={handleChange}
                                />
                        </div>
                    </div>
                </div>
                <div className="information">
                    <p>Lisiting Details</p>
                    <div className="label">
                        <center>
                        <div className="inputs">
                            <p>Title of Listing</p>
                            <input 
                                name="title" 
                                type="text" 
                                placeholder="Example: State and phrase"
                                onChange={handleChange}
                                value={formData.title}  
                            />
                        </div>
                        <div className="inputs">
    <p>Description of Listing</p>
    <textarea
        name="description"
        placeholder="Write a description of the plate. What does it look like? Does it have a history?"
        onChange={handleChange}
        value={formData.description}
        rows="8" // Set the number of rows as needed
    />
</div>
<div className="inputs">
    <p>List of Known Flaws</p>
    <textarea
        name="flaws"
        placeholder="Write any flaws that the plate may have. For example: scratches, dents, any holes, or other imperfections."
        onChange={handleChange}
        value={formData.flaws}
        rows="8" // Set the number of rows as needed
    />

    <br></br>
    
</div>
   
                        </center>
                    </div>
                </div>
                <div className="information">
                    <p>Auction Details and Posting</p>
                    <div className="label">
                        <div className="inputs">
                            <label className="starting-label">Starting Price:</label>
                            <input type="number" className="starting-price" name="price" placeholder="$ Optional" value={formData.startingPrice} onChange={handleChange}></input>
                            <p id="posting-description-one" >The duration of ALL listings last 7 days from creation</p>
                            <p id="posting-description-one" >Default price starts at $1</p>
                            {/* <p id="posting-description-two"> Would you like to post your listing now or schedule a post time?</p> */}
                            {/* <div id="post-buttons-container">
                                <button id="Schedule-Post"> Schedule Post </button>
                                <button id="Post-Now"> Post Now </button>
                            </div> */}
                        </div>
                        <br></br>
                    </div>
                </div>
                <button onClick={handleSubmit}><img src="/images/submit_listing.png" alt="submit" width={500} height={500}></img></button>
            </div>
        </div>
    );
}