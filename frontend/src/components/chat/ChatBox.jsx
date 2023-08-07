import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import axios from 'axios';

const url = 'http://localhost:3001/api/getMensajes'
const urlSend = 'http://localhost:3001/api/createMensaje'

const ChatBox = () => {
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
      origen: "20.570.846-4",
      destino: "0.000.000-0",
      contenido: mensaje
    }
    const res = axios.post(urlSend, value).then(() => {
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
    <Stack spacing={2} justifyContent={"flex-end"}>
      <Stack spacing={2}>
        {mensajes.map((mensaje) => (
          <React.Fragment key={mensaje._id}>
            <Card style={{ backgroundColor: "#F6F1F1" }}>
              <CardContent>
                <Stack alignItems={mensaje.origen == "0.000.000-0" ? "" :"flex-end"}>
                  <Typography sx={{ fontSize: 12 }} gutterBottom>
                    {mensaje.origen}
                  </Typography>
                  <Typography sx={{ fontSize: 16 }}>
                    {mensaje.contenido}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
        
      </Stack>
      <Stack p={2}>
        <FormControl variant='outlined' sx={{ background: '#f0f0f0' }}>
          <OutlinedInput
            id='mensaje'
            placeholder='Envie un mensaje'
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge="end" color='primary' onClick={handleSend}>
                  <SendIcon/>
                </IconButton>
              </InputAdornment>
            }
            value={mensaje}
          />
        </FormControl>
      </Stack>
      <div ref={mensajesContainerRef}/>
    </Stack>
  );
}

export default ChatBox;
