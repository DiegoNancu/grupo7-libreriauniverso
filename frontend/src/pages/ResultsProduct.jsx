import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardProduct from '../components/Product/CardProduct';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import logo from "../assets/logo.jpg";


function ResultsProduct() {
  const { nameP } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const getCategory = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getOneP/${nameP}`);
      
      setData(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [nameP]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);


  return (
    <Stack>
      <NavBar/>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        {loading ? (
          <CircularProgress style={{ marginTop: '50px' }} />
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {data.length > 0 ? (
              data.map((product) => (
                <Card sx={{ width: 200,height:300, marginBottom: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', marginLeft:3, marginTop:3 }}>
                <CardActionArea sx={{ width: 200,height:300 }}>
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
                  </CardContent>
                </CardActionArea>
              </Card>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ fontStyle: 'italic' }}>
                  No hay productos que coincidan con los filtros seleccionados.
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Stack>
  );
}

export default ResultsProduct;
