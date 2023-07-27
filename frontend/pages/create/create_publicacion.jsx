import { useState } from 'react'
import axios from 'axios'

const create_Publicacion = () => {

    const [values, setPublicacion] = useState({
        nombre_tienda: '',
        fecha: '',
        status: '',
        descripcion: ''
    })

    const router = useRouter()
}