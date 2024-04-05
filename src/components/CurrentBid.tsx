import React from 'react';
import '@/src/styles/currentBid.css';

const CurrentBid = ({
  currentBidder,
  currentBid,
  seller,
  location,
  endingTime,
  bidsCount,
}) => {
  return (
    <div className="current-bid-container">
        <br></br>
      <div className="left-half">
        <div className="current-bidder">
          Current Bid&nbsp;
          <span role="img" aria-label="globe">
            🌐
          </span>
          &nbsp;{currentBidder}
        </div>
        <div className="big-number">${currentBid}</div>
      </div>
      <div className="right-half">
        
        <div className="seller">
          Time of Bid:&nbsp;
          <span role="img" aria-label="clock">
            ⌚
          </span>
          &nbsp;{endingTime}
        </div>
        <div className="seller">
          Ending&nbsp;
          <span role="img" aria-label="clock">
            ⌚
          </span>
          &nbsp;{endingTime}
        </div>

        <div className="seller">
          Contact -
          
          Available to seller after auction completion
        </div>

        <div className="seller">
          Bids&nbsp;
          <span role="img" aria-label="hash">
            #
          </span>
          &nbsp;{bidsCount}
        </div>
    
      </div>
    </div>
  );
};

export default CurrentBid;