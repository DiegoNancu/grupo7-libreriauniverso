import NavBar from '../components/NavBar';

import '../App.css';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';

const Messagges = () => {
  return(
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Usuario
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            Hola!
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Libreria Universo
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            Hola!
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  )
}

const Chat = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container">
        <div className="content">
          <Stack spacing={4}>
            <Messagges/>
            <TextField
              id="outlined-multiline-flexible"
              label="Mensaje"
              multiline
              maxRows={4}
            />
          </Stack>
          
        </div>
      </div>
    </div>
  );
}

export default Chat;
