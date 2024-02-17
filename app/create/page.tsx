import React from "react";
import './css/create.css';
import { TextField } from '@mui/material'

export default function Create() {
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
                                <input id="firstName" type="text" />
                            </div>
                            <div className="inputs">
                                <p>Last Name</p>
                                <input id="lastName" type="text" />
                            </div>

                        </div>
                        <div className="input_row">
                            <div className="inputs">
                                <p>Email Address</p>
                                <input id="email" type="text" />
                            </div>
                            <div className="inputs">
                                <p>Zip Code</p>
                                <input id="zip" type="number" />
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
                                <input id="plateNumber" type="text"/>
                            </div>
                            <div className="inputs">
                                <p>Year Issued</p>
                                <input id="yearIssued" type="date"/>
                            </div>
                            <div className="inputs">
                                <p>State Issued</p>
                                <input id="stateIssued" type="text"/>
                            </div>
                        </div>
                        <div className="input_row">
                            <div className="inputs">
                                <p>Main Color</p>
                                <input id="mainColor" type="text"/>
                            </div>
                            <div className="inputs">
                                <p>Accent Color</p>
                                <input id="accentColor" type="text"/>
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
                            <input id="title" type="text" placeholder="Example: State and phrase"/>
                        </div>
                        <div className="inputs">
                            <p>Description of Listing</p>
                            <input id="description" type="text" placeholder="Write a description of the plate. What does it look like Does it have a history?" />
                        </div>
                        <div className="inputs">
                            <p>List of Known Flaws</p>
                            <input  id="flaws" type="text" placeholder="Write any flaws that the plate may have. For example: scratches, dents, any holes, or other imperfections."/>
                        </div>    
                    </div>
                </div>
                <div className="information">
                    <p>Auction Details and Posting</p>
                    <div className="label">
                        <div className="inputs">
                            <p>Starting Price</p>
                            <input id="startingPrice" type="money"/>
                        </div>
                        <p>The duration of ALL listings last 7 days</p>
                        <p>Would you like to post your listing now or schedule a post time?</p>
                        <div className="input_row">
                            <div className="inputs">
                                <button>Schedule Post</button>
                                <input id="postInfo" type="text"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}