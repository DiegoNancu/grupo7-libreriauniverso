import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar';
import { Stack, Container, FormControl, FormLabel, Input, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export async function getServerSideProps(context) {
    try{
        const res = await axios.get(`${process.env.API_URL}/listPro/search/${context.params.UpdatePro}`)
        return {
            props: {
                data: res.data
            }
        }
    }catch(error){
        return {
            redirect: {
                destination: '/create/createpublicacion',
                permanet: false
            }
        }
    }
}

const UpdatePro = (data) => {
    const navigate = useNavigate();

    const [Productou] = useState(data.data)

    let [values, setProducto] = useState({
        nombre: '',
        costo: '',
        precio_venta: '',
        stock: '',
        categoria: '',
    })

    const onSubmit = async (e) =>  {
        e.preventDefault()
        for(const key in values) {
            if(values[key] === '') {
                values[key] = Productou[key]
            }
        }

        try {
            const response = await axios.put(`${process.env.API_URL}/updatePro/${Productou.id}`, values)
            if (response.status === 200) {
                Swal.fire({
                    title: 'Publicacion actualizada',
                    text: 'La publicacion se ha actualizado correctamente',
                    icon: 'success',
                    confirmButtontext: 'OK'
                }).then((result) => {
                    if(result.isConfirmed) {
                        navigate('/AdminPubli')
                    }
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ingresar los nuevos parametros',
                    icon: 'error',
                    confirmButtontext: 'OK'
                })
            }
        }catch{
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido actualizar la publicacion',
                icon: 'Error',
                confirmButtontext: 'OK'
            })
        }
    }

    const onChange = (e) => {
        setProducto({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <NavBar />
        <Stack alignItems="center" textAlign="center">
            <Card sx={{ backgroundColor: 'white', borderRadius: 10, boxShadow: 'md' }}>
            </Card>
            <Container maxW="container.md" centerContent>
            <Stack my={4} spacing={2}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                        type="text"
                        name={"nombre"}
                        defaultValue={Productou.nombre}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Costo</FormLabel>
                    <Input
                        type="Number"
                        name="costo"
                        defaultValue={Productou.costo}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Precio venta</FormLabel>
                    <Input
                        type="Number"
                        name="precio_venta"
                        defaultValue={Productou.precio_venta}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Stock</FormLabel>
                    <Input
                        type="Number"
                        name="stock"
                        defaultValue={Productou.stock}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Categoria</FormLabel>
                    <Input
                        type="Schema.Types.ObjectId"
                        name="categoria"
                        defaultValue={Productou.categoria}
                        onChange={onChange}
                    />
                </FormControl>
                <Button variant="outlined" color="success"onClick={onSubmit}>Actualizar </Button>
                <Button variant="outlined" color="error"onClick={() => navigate('/AdminPubli')}>Cancelar</Button>
            </Stack>
            </Container>
        </Stack>
        </div>
    )
}

export default UpdatePro;