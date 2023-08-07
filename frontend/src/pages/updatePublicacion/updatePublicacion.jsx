import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Stack, Container, FormControl, FormLabel, Input, Button, ButtonGroup, Card, CardBody, Text } from '@mui/material';

export async function getServerSideProps(context) {
    try{
        const res = await axios.get(`${process.env.API_URL}/listPro/search/${context.params.updateActa}`)
        return {
            props: {
                data: res.data
            }
        }
    }catch(error){
        return {
            redirect: {
                destination: '/create/create_publicacion',
                permanet: false
            }
        }
    }
}

const UpdatePro = (data) => {
    const router = useRouter()

    const [Producto] = useState(data.data)

    let [values, setProducto] = useState({
        nombre: '',
        costo: '',
        precio_venta: '',
        stock: '',
        categoria: ''
    })

    const onSubmit = async (e) =>  {
        e.preventDefault()
        for(const key in values) {
            if(values[key] === '') {
                values[key] = Producto[key]
            }
        }

        try {
            const response = await axios.put(`${process.env.API_URL}/updatePro/${Producto.id}`, values)
            if (response.status === 200) {
                Swal.fire({
                    title: 'Publicacion actualizada',
                    text: 'La publicacion se ha actualizado correctamente',
                    icon: 'success',
                    confirmButtontext: 'OK'
                }).then((result) => {
                    if(result.isConfirmed) {
                        router.push('/options/PublicacionAdmin')
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
        <Stack alignItems="center" textAlign="center">
            <Card sx={{ backgroundColor: 'white', borderRadius: 10, boxShadow: 'md' }}>
            </Card>
            <Container maxW="container.md" centerContent>
            <Stack my={4} spacing={2}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                        type="text"
                        name="nombre"
                        defaultValue={Producto._nombre}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Costo</FormLabel>
                    <Input
                        type="Number"
                        name="costo"
                        defaultValue={Producto._costo}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Precio venta</FormLabel>
                    <Input
                        type="Number"
                        name="precio_venta"
                        defaultValue={Producto._precio_venta}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Stock</FormLabel>
                    <Input
                        type="Number"
                        name="stock"
                        defaultValue={Producto._stock}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Categoria</FormLabel>
                    <Input
                        type="Schema.Types.ObjectId"
                        name="categoria"
                        defaultValue={Producto._categoria}
                        onChange={onChange}
                    />
                </FormControl>
                <Button variant="outlined" color="success"onClick={onSubmit}>Actualizar </Button>
                <Button variant="outlined" color="error"onClick={() => router.push('/options/PublicacionAdmin')}>Cancelar</Button>
            </Stack>
            </Container>
        </Stack>
    )
}

export default UpdatePro;