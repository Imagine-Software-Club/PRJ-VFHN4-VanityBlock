import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

const sxOuterCard = {
  height: 350,
  width: 250,
  borderRadius: 10
};

function Item(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        p: 0.5,
        bgcolor: '#1C1C1D',
        border: '2px solid',
        borderColor: '#1C1C1D',
        borderRadius: 8,
        fontSize: '1rem',
        fontWeight: '500',
        ...sx,
      }}
      {...other}
    />
  );
}

function ListingCard(props) {
  const endTime = new Date(props.endTime).getTime();
  const calculateTimeLeft = () => {
    const now = Date.now();
    const timeLeft = endTime - now;
    return timeLeft / 1000;
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

  const listing = props;

  return (
    <Link href={`/listings/${listing.id}`} underline="none">
      <Card sx={{ ...sxOuterCard }}>
        <CardMedia
          component="img"
          sx={{
            objectFit: 'contain',
            height: 200,
            width: '100%', // Adjusted to 100% to show the whole image
          }}
          image={listing.picture}
          alt="Listing Image"
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            p: 1,
          }}
        >
          <Item>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <Box
                component="img"
                sx={{
                  maxHeight: 20,
                  maxWidth: 20,
                }}
                alt="Clock Icon"
                src="images/Clock.png"
              />
              {timer > 0 ? formatTime(timer) : "Ended"}
            </Box>
          </Item>
          <Item>{formatPrice(listing.price)}</Item>
        </Box>
      </Card>
    </Link>
  );
}

export default ListingCard;
