"use client"

import React from "react";
import './css/create.css';
import { TextField } from '@mui/material'
import { useState }  from "react"
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
        startingPrice: "",
        postInfo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData({
            ...formData, // Spread the existing formValues
            [name]: value // Update the value for the specific input name
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log(formData);

        // API stuff goes here
        try {
            const response = await fetch('http://localhost:8000/listings', {  // Adjust the URL/port as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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

        window.location.reload();


    };

    return(
        <div className="wrapper">
            <div className="container">
                <p>List your plate</p>
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
                                    type="date"
                                    onChange={handleChange}
                                    value={formData.yearIssued}     
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
                </div>
                <div className="information">
                    <p>Lisiting Details</p>
                    <div className="label">
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
                            <input 
                                name="description" 
                                type="text" 
                                placeholder="Write a description of the plate. What does it look like Does it have a history?" 
                                onChange={handleChange}
                                value={formData.description}  
                            />
                        </div>
                        <div className="inputs">
                            <p>List of Known Flaws</p>
                            <input  
                                name="flaws"
                                type="text" 
                                placeholder="Write any flaws that the plate may have. For example: scratches, dents, any holes, or other imperfections."
                                onChange={handleChange}
                                value={formData.flaws}  
                            />
                        </div>    
                    </div>
                </div>
                <div className="information">
                    <p>Auction Details and Posting</p>
                    <div className="label">
                        <p>Starting Price: $1.00</p>
                        <br></br>
                        <p>The duration of ALL listings last 7 days</p>
                        <p>If bid placed under 1 minute left, the listing resets timer to 1 minute</p>
                        <br></br>
                    </div>
                </div>
                <button onClick={handleSubmit}><img src="/images/submit_listing.png" alt="submit" width={500} height={500}></img></button>
            </div>
        </div>
    );
}