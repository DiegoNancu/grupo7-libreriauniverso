import { Card, CardContent, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

const INTERVAL = 1000

const url = 'http://146.83.198.35:1338/api/getMensajes'
const urlSend = 'http://146.83.198.35:1338/api/createMensaje'
const urlUser = 'http://146.83.198.35:1338/api/getUserByEmail/'

const ChatBox = () => {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ mensajes, setMensajes ] = React.useState([])
  const [ mensaje, setMensaje ] = React.useState("")
  const [ usuario, setUsuario ] = React.useState(null)
  const mensajesContainerRef = React.useRef(null)

  const location = useLocation()

  const getMensajes = async () => {
    const res = await axios.get(urlUser + location.state)
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
      origen: "00.000.000-0",
      destino: usuario.rut,
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
              alignSelf: mensaje.origen === "00.000.000-0" ? 'flex-end' : 'flex-start',
              textAlign: mensaje.origen === "00.000.000-0" ? 'right' : 'left'
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
