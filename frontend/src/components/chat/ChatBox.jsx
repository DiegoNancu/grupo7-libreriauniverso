import { Card, CardContent, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const INTERVAL = 1000

const url = 'http://localhost:3001/api/getMensajes'
const urlSend = 'http://localhost:3001/api/createMensaje'
const urlUser = 'http://localhost:3001/api/getUserByEmail/'

const ChatBox = () => {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ mensajes, setMensajes ] = React.useState([])
  const [ mensaje, setMensaje ] = React.useState("")
  const [ usuario, setUsuario ] = React.useState(null)
  const mensajesContainerRef = React.useRef(null)

  const getMensajes = async () => {
    const res = await axios.get(urlUser + Cookies.get("email"))
    setUsuario(res.data)
    const resm = await axios.get(url, { params: { origen: res.data.rut } })
    setMensajes(resm.data)
    setIsLoading(false)
  }

  const handleInputChange = (event) => {
    setMensaje(event.target.value)
    console.log(mensaje)
  }

  const handleSend = () => {
    const value = {
      origen: usuario.rut,
      destino: "00.000.000-0",
      contenido: mensaje
    }
    axios.post(urlSend, value).then(() => {
      getMensajes()
      setMensaje("")
    }).catch(error => {
      console.error("Error", error)
    })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  }

  React.useEffect(() => {
    getMensajes()
    const intervalId = setInterval(getMensajes, INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  React.useLayoutEffect(() => {
    mensajesContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [mensajes])

  if(isLoading) {
    return(
      <div>Cargando...</div>
    )
  }

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
              alignSelf: mensaje.origen === "00.000.000-0" ? 'flex-start' : 'flex-end',
              textAlign: mensaje.origen === "00.000.000-0" ? 'left' : 'right'
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 12 }} gutterBottom>
                {mensaje.origen === "00.000.000-0" ? "Libreria Universo" : usuario.name}
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

export default ChatBox;
