import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

const sxOuterCard = {
  height: 300,
  width: 430,
  border: "none",
  boxShadow: "none",
};

function Item(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        p: 0.2,
        bgcolor: '#1C1C1D',
        border: '2px solid',
        borderColor: '#1C1C1D',
        borderRadius: 1.5,
        fontSize: '1.2rem',
        fontWeight: '500',
        ...sx,
      }}
      {...other}
    />
  );
}

function ListingCard(props) {
  // Parse endTime to get a Date object, then get the time in milliseconds
  const endTime = new Date(props.endTime).getTime();

  const calculateTimeLeft = () => {
    const now = Date.now(); // Current time in milliseconds
    const timeLeft = endTime - now; // Time left in milliseconds
    return timeLeft / 1000; // Convert time left to seconds
  };

  const [timer, setTimer] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      if (timeLeft > 0) {
        setTimer(timeLeft);
      } else {
        clearInterval(intervalId);
        setTimer(0);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Access the first listing as an example
  const listing = props;

  return (
    <Link href={`/listings/${listing.id}`} underline="none">
      <Card sx={{ ...sxOuterCard }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            sx={{
              objectFit: 'contain',
              height: 300,
              width: 430,
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            image={listing.picture}
            alt="Listing Image"
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              color: 'white',
              padding: '10px',
            }}
          >
            <Item>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <Box
                  component="img"
                  sx={{
                    maxHeight: 20,
                    maxWidth: 20,
                    m: 0.5,
                  }}
                  alt="Clock Icon"
                  src="images/Clock.png"
                />
                {timer > 0 ? formatTime(timer) : "Ended"}
              </Box>
            </Item>
            <Item>{formatPrice(listing.price)}</Item>
          </Box>
        </Box>

        <CardContent>
          <h1>
            <center>{listing.title}</center>
          </h1>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ListingCard;
