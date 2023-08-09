import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import axios from 'axios';

const url = 'http://localhost:3001/api/getMensajes'
const urlSend = 'http://localhost:3001/api/createMensaje'

const ChatBoxAdmin = () => {
  const [ mensajes, setMensajes ] = React.useState([])
  const [ mensaje, setMensaje ] = React.useState("")

  const user = { "origen": "20.570.846-4" }
  const mensajesContainerRef = React.useRef(null)

  const getMensajes = async () => {
    const res = await axios.get(url, { params: user })
    setMensajes(res.data)
  }

  const handleInputChange = (event) => {
    setMensaje(event.target.value)
    console.log(mensaje)
  }

  const handleSend = () => {
    const value = {
      origen: "0.000.000-0",
      destino: "20.570.846-4",
      contenido: mensaje
    }
    axios.post(urlSend, value).then(() => {
      getMensajes()
      setMensaje("")
    })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  }

  React.useEffect(() => {
    getMensajes()
  }, [])

  React.useLayoutEffect(() => {
    mensajesContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [mensajes])

  return (
    <Stack spacing={1} sx={{ backgroundColor: '#F9F9F9', padding: '10px' }}>
      <Stack spacing={1}>
        {mensajes.map((mensaje) => (
          <Card
            key={mensaje._id}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
              height: 'auto',
              alignSelf: mensaje.origen === "0.000.000-0" ? 'flex-end' : 'flex-start',
              textAlign: mensaje.origen === "0.000.000-0" ? 'right' : 'left'
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 12 }} gutterBottom>
                {mensaje.origen}
              </Typography>
              <Typography sx={{ fontSize: 16 }}>
                {mensaje.contenido}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Stack p={2} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
        <FormControl variant='outlined' sx={{ background: 'transparent' }}>
          <OutlinedInput
            id='mensaje'
            placeholder='Envie un mensaje'
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge="end" color='primary' onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
            value={mensaje}
            fullWidth
            sx={{ borderRadius: '10px' }}
          />
        </FormControl>
      </Stack>
      <div ref={mensajesContainerRef} />
    </Stack>
  );
}

export default ChatBoxAdmin;
