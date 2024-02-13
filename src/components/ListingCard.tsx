import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { borders } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';

const sxOuterCard = {
  width: "27%",
  height: "39%",
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
        borderRadius: 1,
        fontSize: '0.7rem',
        fontWeight: '500',
      }}
      {...other}
    />
  );
}

export default function ListingCard(props: any){
  return(
    <Card sx={{...sxOuterCard, }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="100%"
          image="/images/PlateExample.jpg"
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
          <Item> {props.time} </Item>
          <Item> {props.price} </Item>
        </Box>
      </Box>

      <CardContent>
        <h1>
          <b>
          <center> {props.name} </center>
          </b>
        </h1>
      </CardContent>
    </Card>
  );
}

{/*
function Item(props: BoxProps){
  // Enable adding sx and other configurations
  const {sx, ...other} = props;

  return(
    <Box
      sx = {{
        p: 1,
        m: 0.1,
        position: 'absolute',
        // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        // borderColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    />
  );
}

export default function ListingCard(props: any) {
  return (
    <Box
      sx={{ height: '300px', 
            width: '300px',
            border: '1px solid',
            borderRadius: 10,
            bordercolor: 'dark',
            // backgroundImage: 'url(../../static/images/cards/PlateExample.jpg)',
            // backgroundSize: "cover",
      }}
    >
      <Card variant="outlined">  

      <React.Fragment>
        
        <CardMedia
          component="img"
          height="194"
          image="../../static/images/cards/PlateExample.jpg"
          alt="VanityBlock101"
        />

        <div style = {styles.overlay}>
          AAAA I want to destroy
        </div>

        <Item>props.date</Item>

        <CardContent>

          <center>
          <h1>{props.name}</h1>
          </center>

          {/*
          <Box 
            sx = {{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
              m: 0.1,
              // bgcolor: 'background.paper',
              // borderRadius: 10,
              // bordercolor: 'dark',
            }}
          >
            <Item>props.date</Item>
            <Item>props.price</Item>
          </Box>

        </CardContent>
      
      </React.Fragment>
      
      </Card>
    </Box>
  );
}
*/}
