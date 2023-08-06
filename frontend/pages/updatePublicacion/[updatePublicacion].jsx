import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { updateProducts } from '../../../backend/controllers/productController'

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

const updatePro = (data) => {
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
            const response = await axios.put(`${process.env.API_URL}/updatePro/${Actau._id}`, values)
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

        const onChange = (e) => {
            setProducto({
                ...values,
                [e.target.name]: e.target.value,
            })
        }
    }
}

export default updatePro