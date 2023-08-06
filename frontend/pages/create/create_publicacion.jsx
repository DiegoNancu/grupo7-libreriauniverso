import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const create_Publicacion = () => {

    const [values, setPublicacion] = useState({
        nombre: '',
        costo: '',
        precio_venta: '',
        stock: '',
        categoria: ''
    })

    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        if(response.status === 201){
            Swal.fire({
                title: 'Publicacion creada',
                test: 'Publicacion creada correctamente',
                icon: 'success',
                confirmButtontext: 'ok'
            }).then((result) => {
                if(result.isConfirmed) {
                    //poner nombre a archivo con las opciones de crecaion y edicion.
                }
            })
        }
    }

    const onChange = (e)  => {
        setPublicacion({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
}



export default create_Publicacion