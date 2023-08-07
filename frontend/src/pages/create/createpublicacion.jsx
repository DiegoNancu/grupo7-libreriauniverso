import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { Stack, Container, Typography, TextField, Button, ButtonGroup } from '@mui/material';

const CreatePublicacion = () => {

    const [values, setPublicacion] = useState({
        nombre: '',
        costo: '',
        precio_venta: '',
        stock: '',
        categoria: ''
    })

    const router = useRouter()

    const publicacionRouter = () => {
        router.push('/options/PublicacionAdmin')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try{
            const response = await axios.post(`${process.env.API_URL}/addPro`, values)
            if(response.status === 201){
                Swal.fire({
                    title: 'Publicacion creada',
                    test: 'Publicacion creada correctamente',
                    icon: 'success',
                    confirmButtontext: 'ok'
                }).then((result) => {
                    if(result.isConfirmed) {
                        publicacionRouter()
                    }
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ingresar parametros',
                    icon: 'Error',
                    confirmButtontext: 'OK'
                })
            }
        }catch(err){
            Swal.fire({
                title: 'Error',
                text: 'La publicacion no se ha podido crear',
                icon: 'Error',
                confirmButtontext: 'OK'
            })
        }
    }

    const onChange = (e)  => {
        setPublicacion({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <Stack alignItems="center" textAlign="center" sx={{ backgroundColor: "rgb(244,247,254)" }}>
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" my={4}>Creacion de Producto</Typography>
                <Stack my={4} alignItems="center" textAlign="center">
                    <TextField
                        label="Nombre Producto"
                        type="text"
                        onChange={onChange}
                        name="nombre"
                        variant="outlined"
                    />
                    <TextField
                        label="Costo"
                        type="Number"
                        onChange={onChange}
                        name="Costo"
                        multiline
                        rows={1}
                        variant="outlined"
                    />
                    <TextField
                        label="Precio Venta"
                        type="Number"
                        onChange={onChange}
                        name="precio_venta"
                        multiline
                        rows={1}
                        variant="outlined"
                    />
                    <TextField
                        label="Stock"
                        type="Number"
                        onChange={onChange}
                        name="Stock"
                        multiline
                        rows={1}
                        variant="outlined"
                    />
                    <TextField
                        label="Categoria"
                        type="Schema.Types.ObjectId"
                        onChange={onChange}
                        name="categoria"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Stack spacing={2}>
                        <ButtonGroup variant="outlined" spacing={2}>
                            <Button color="primary" onClick={onSubmit}>Crear</Button>
                            <Button color="error" onClick={push.publicacionRouter}>Cancelar</Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}



export default CreatePublicacion