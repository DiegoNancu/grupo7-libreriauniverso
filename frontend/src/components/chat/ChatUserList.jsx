import { Card, CardContent, List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const url = 'http://localhost:3001/api/getUsersAll'

function ChatUserList() {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ usuarios, setUsuarios ] = React.useState([])
  const navigate = useNavigate()
  const usuariosFiltrados = usuarios.filter(usuario => usuario.rut !== "00.000.000-0")

  const getUsuarios = async () => {
    const res = await axios.get(url)
    setUsuarios(res.data)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getUsuarios()
  }, [])

  if(isLoading) {
    return(
      <div>Cargando...</div>
    )
  }

  return (
    <Stack spacing={1}>
      {usuariosFiltrados.map((usuario) => (
        <Card key={usuario._id} sx={{ backgroundColor: '#F6F1F1' }}>
          <CardContent>
            <ListItem onClick={() => {navigate("/ChatAdmin", { state: usuario.email })}}>
              <ListItemButton>
                <ListItemText primary={"Hablar con " + usuario.name} secondary={"Rut: " + usuario.rut}/>
              </ListItemButton>
            </ListItem>
          </CardContent>
        </Card>
        ))}
    </Stack>
  )
}

export default ChatUserList