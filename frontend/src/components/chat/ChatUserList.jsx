import { List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const url = 'http://146.83.198.35:1338/api/getUsersAll'

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
    <Stack>
      <List>
        {usuariosFiltrados.map((usuario) => (
          <ListItem key={usuario._id} onClick={() => {navigate("/ChatAdmin", { state: usuario.email })}}>
            <ListItemButton>
              <ListItemText primary={"Hablar con " + usuario.name} secondary={"Rut: " + usuario.rut}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default ChatUserList