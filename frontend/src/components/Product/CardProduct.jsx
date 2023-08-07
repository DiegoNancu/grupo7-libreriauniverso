import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo from "../../assets/logo.jpg";

export default function ActionAreaCard() {
  return (
    <Card sx={{ width: 300, marginBottom: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={logo}
          alt="Product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            NAME
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            PRICE
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DESCRIPTION
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}