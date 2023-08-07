import { useState, useEffect} from 'react'
import { Stack, Button, Card, CardHeader, Heading, Text, CardBody, SimpleGrid} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

const compras = () =>{
    const router = useRouter()
    const [compras, setCompras] = useState([])
    const [user, setUser] = useState({ user : null, loading: false})

    const [isLogged, setIsLogged] = useState(Cookies.get('logged') === 'true')

    const getUser = async() =>{
        const response = await axios.get(`${process.env.API_URL}/getUserByEmail/${Cookies.get('email')}`)
        //console.log(response.data)
        setUser(response.data)
    }

    useEffect(() => {
        if (isLogged) {
            getUser()
        }
    }, [isLogged])

    useEffect(() => {
        if (user.user !== null) {
            getComprasByUser();
        }
    }, [user]);

    const getComprasByUser = async () => {
        try {
            //console.log(user._id)
            const response = await axios.get(`${process.env.API_URL}/getComprasByUser/${user._id}`)
            //console.log(response.data)
            setCompras(response.data)
        } catch (error) {
        }
    }

    const reclamos = (id) => {
        Cookies.set('idCompras', id)
        router.push(`/reclamos`)
    }

    const showCompras = () =>{
        if(compras.length === 0){
            return(
                <Card boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"} width={'400px'} bgGradient="linear(to-l, #D7F8D7, #AEDBC4)">
                    <CardHeader>
                        <Heading size='md' fontSize='4xl' as='i'>No se han realizado compras.</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text fontSize='2xl'>Al realizar compras podrás ver cada una de ellas aquí</Text>
                    </CardBody>
                </Card>
        )} else {
            return compras.map(compra => {
                return (
                    <Card key={compra._id} boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"} bgGradient="linear(to-l, #29B6F6, #80DEEA)">
                        <CardHeader textAlign={'center'}>
                            <Heading size='md'>{compra.id_producto}</Heading>
                            <Text>Fecha de compra: {compra.fecha_compra}</Text>
                            <Button colorScheme="blue" size="md" type="sumbit" onClick={() => reclamos(compra._id)}>Gestionar Reclamo</Button>
                        </CardHeader>
                    </Card >
                )
            })
        }
    }

return(
    <Stack alignItems={"center"} textAlign={'center'}>
        <SimpleGrid columns={compras.length < 2 ? 1 : 4}>{showCompras()}</SimpleGrid>
    </Stack>
)
}

export default compras