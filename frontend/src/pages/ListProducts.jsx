import NavBar from '../components/NavBar';
import GirdPro from '../components/GirdPro';
import Box from '@mui/material/Box';

import '../App.css';


const ListProducts = () => {
  return (
    <Box>
      <NavBar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <GirdPro />
      </Box>
    </Box>
  );
}

export default ListProducts;
