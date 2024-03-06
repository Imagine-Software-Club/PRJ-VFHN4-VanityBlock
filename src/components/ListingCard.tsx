import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
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

function Item(props: BoxProps) {
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

function ListingCard(props: any) {
  const [timer, setTimer] = React.useState(24 * 60 * 60); // 24 hours in seconds

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Cleanup the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Link href={`/listings/${props.id}`} underline="none">
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
            image="images/PlateExample.jpg"
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
                {formatTime(timer)}
              </Box>
            </Item>
            <Item>{props.price}</Item>
          </Box>
        </Box>

        <CardContent>
          <h1>
            <center>{props.name}</center>
          </h1>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ListingCard;
