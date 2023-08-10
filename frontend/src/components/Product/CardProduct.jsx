import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo from "../../assets/logo.jpg";
import { useNavigate  } from 'react-router-dom';

export default function ActionAreaCard({ product }) {
  const navigator = useNavigate();

  return (
    <Card sx={{ width: 200,height: 300, marginBottom: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)' }}>
      <CardActionArea  sx={{ width: 200,height:300 }} onClick={()=> navigator(`/Vproduct/${product._id}`)}>
        <CardMedia
          component="img"
          height="150"
          image={logo}
          alt="Product"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.nombre}
          </Typography>
          <Typography gutterBottom variant="h8" component="div" >
            ${product.precio_venta}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {product.descripcion}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}