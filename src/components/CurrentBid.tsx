import * as React from 'react';
import { PropaneSharp } from '@mui/icons-material';
import '@/src/styles/currentBid.css'

export default function CurrentBid(props: any) {
    return (
        <div className="current-bid-container">
            <div className="left-half">
                <center>
                <a href="#" className="link">Current Bidder: Name of Bidder</a>
                <div className="big-number">100</div>
                </center>
            </div>
            <div className="right-half">
                <div className="small-number">10</div>
                <div className="time">10:00 AM</div>
                <div className="contact-info">Contact Info: Available to listing's user following auction</div>
            </div>
        </div>
    );
}
