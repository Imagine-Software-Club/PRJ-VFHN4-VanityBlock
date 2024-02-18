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

function Item(props: BoxProps){
  // Enable adding sx and other configurations
  const {sx, ...other} = props;

  return(
    <Box
      sx = {{
        p: 0.2,
        bgcolor: '#1C1C1D',
        border: '2px solid',
        borderColor: '#1C1C1D',
        borderRadius: 1.5,
        fontSize: '1.2rem',
        fontWeight: '500',
      }}
      {...other}
    />
  );
}

function ListingCard(props: any){
  return(
    <Link href = "listings">
      <Card sx={{...sxOuterCard, }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            sx = {{
              objectFit: 'cover',
              height: 300,
              width: 430,
            }}
            image = "images/PlateExample.jpg"
          />
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              // bgcolor: 'rgba(0, 0, 0, 0.54)',
              color: 'white',
              padding: '10px',
            }}
          >
            <Item>
              <Box sx = {{
                display: 'flex',
                alginItems: 'center',
                flexWrap: 'wrap',
              }}>
                <Box
                  component = "img"
                  sx = {{
                    maxHeight: 20,
                    maxWidth: 20,
                    m: 0.5,
                  }}
                  alt = "Clock Icon"
                  src = "images/Clock.png"
                >

                </Box>
                {props.time}
              </Box> 
            </Item>
            <Item> {props.price} </Item>
          </Box>
          
        </Box>

        <CardContent>
          <h1>
            <center> {props.name} </center>
          </h1>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ListingCard;