import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card, CardHeader, Typography, Button, Stack, Head, Grid, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'

const PublicacionAdmin = () => {

    const [Publicaciones, setPublicacion] = useState([])


    const getPublicacion = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/listPro`)
            setPublicacion(response.data)
        }catch (error){
        }
    }

    useEffect(() => {
        getPublicacion()
    }, [])

    const deleteId = async (id) => {
        try{
            Swal.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado',
                        'Publicacion eliminada.',
                        'OK'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete(`${process.env.API_URL}/deletePro/${id}`)
                        }
                    })
                }
            })
        }catch (error) {

        }
    }

    const showPublicaciones = () => {
        try{
            return Publicaciones.map(publi => {
                return (
                    <Card key={publi.id} boxShadow="1" ml={30} my={4} variant="outlined" overflow="hidden" alignItems="center" borderRadius={20}>
                        <CardHeader
                            title={<Typography variant="h6">{publi.nombre}</Typography>}
                            subheader={
                            <>
                                <Typography variant="body2">{publi.costo}</Typography>
                                <Typography variant="body2">{publi.valor_precio}</Typography>
                                <Typography variant="body2">{publi.stock}</Typography>
                                <Typography variant="body2">{publi.categoria}</Typography>
                            </>
                            }
                        />
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" p={2}>
                            <Typography variant="body2">{publi.costo}</Typography>
                            <Typography variant="body2">{publi.valor_precio}</Typography>
                            <Typography variant="body2">{publi.stock}</Typography>
                            <Typography variant="body2">{publi.categoria}</Typography>
                            <Button startIcon={<EditIcon />} color="primary" variant="contained" to={'/updatePro/${id}'} Component={Link}>Editar</Button>
                            <Button startIcon={<DeleteIcon />} color="error" variant="contained" onClick={() => deleteId(publi.id)}>Eliminar</Button>
                        </Stack>
                    </Card>
                )
            })
        }catch(err){
        }
    }

    return (
        <Stack alignItems="center" textAlign="center">
        <Stack my={4}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<add_circle />}
                to = {'/create/createpublicacion'} Component = {Link}
                size="medium"
                >
                Crear Publicacion
            </Button>
        </Stack>
        <Container maxWidth="md">
            <Grid container spacing={2}>
                {showPublicaciones()}
            </Grid>
        </Container>
        </Stack>
    )
}

export default PublicacionAdmin