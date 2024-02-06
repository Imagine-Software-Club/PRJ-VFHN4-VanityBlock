import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ListingCard(props) {
  return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined">

      <React.Fragment>
        <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            
        </Typography>
        <Typography variant="h5" component="div">
            {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.name}
        </Typography>
        <Typography variant="body2">
            {props.name}
            <br />
            {props.name}
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
      </Card>

      <center>
      <h1>{props.name}</h1>
      </center>

    </Box>
  );
}