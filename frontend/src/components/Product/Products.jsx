// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import CardProduct from './CardProduct';
// import axios from 'axios';

// // tiene que ser una array deberia importan todos los datos de la base de datos
// // import data from '../../data';


// export default function BasicGrid() {

  


//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

//         {/* {
//           data.map((product) => (
//             <Grid item xs={11} sm={6} md={4} lg={3}>
//               <CardProduct key={product.id} product={product} />
//             </Grid>
//           ))
//         } */}

//         <Grid item xs={11} sm={6} md={4} lg={4} >
//           <CardProduct />
//         </Grid>
//         <Grid item xs={11} sm={6} md={4} lg={4}>
//           <CardProduct />
//         </Grid>
//         <Grid item xs={11} sm={6} md={4} lg={4}>
//           <CardProduct />
//         </Grid>
//         <Grid item xs={11} sm={6} md={4} lg={4}>
//           <CardProduct />
//         </Grid>

//       </Grid>
//     </Box>
//   );
// }




import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardProduct from './CardProduct';
import CircularProgress from '@mui/material/CircularProgress'; // Importar el componente de CircularProgress
import axios from 'axios';

export default function BasicGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el círculo de carga

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/listPro/');
      setData(response.data);
      setLoading(false); // Cambiar el estado a "false" cuando los datos se han cargado
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Cambiar el estado a "false" incluso si hay un error para evitar que el círculo de carga quede indefinidamente
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(data);

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          {/* Condición para mostrar el círculo de carga */}
          {loading ? (
              <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
            ) : (
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {/* Condición para mostrar los datos solo si no están vacíos */}
                {data.products &&
                  data.products.map((product) => (
                    <Grid item  xs={11} sm={6} md={4} lg={3}>
                      <CardProduct />
                      {/* <CardProduct key={product.id} product={product} /> */}
                    </Grid>
                  ))}
              </Grid>
            )}
      </Grid>

      
    </Box>
  );
}
