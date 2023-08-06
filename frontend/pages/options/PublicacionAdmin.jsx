import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const PublicacionAdmin = () => {

    const [Publicaciones, setPublicacion] = useState([])

    const router = useRouter()

    const getPublicacion = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/listPro`)
            setPublicacion(response.data)
        }catch (error){
        }

        useEffect(() => {
            listPro()
        }, [])

        const deleteId = async (id) => {
            try {
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

        const updatePublicacion = (id) => {
            router.push(`/updatePro/${id}`)
        }

        const createShow = () => {
            router.push('/create/create_publicacion')
        }

        //return(
            
        //)
    }
}