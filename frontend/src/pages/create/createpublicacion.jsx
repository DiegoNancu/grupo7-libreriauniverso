import { useState  ,  useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Stack, Container, Typography, TextField, Button, MenuItem, Select, CircularProgress, InputLabel, FormControl, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CreatePublicacion = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [values, setPublicacion] = useState({
        nombre: '',
        costo: '',
        precio_venta: '',
        stock: '',
        categoria: ''
    })

    const publicacionRouter = () => {
        navigate('/AdminPubli')
    }

    const [valcat, setValcat] = useState([])

    const categorias = async () => {
        const cat  = await axios.get('http://localhost:3001/api/listCat')
        setValcat(cat.data)
        setLoading(false);
    }

    useEffect(() => {
        categorias();
    }, []);

    console.log(valcat)

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try{
            const response = await axios.post(`http://localhost:3001/api/addPro`, values)
            console.log(response)
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
        <Stack alignItems="center" textAlign="center" spacing={2} marginTop={"80px"}>
            <Card sx={{ backgroundColor: '#F9F9F9', borderRadius: 10, boxShadow: 'md' }}>
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" my={4}>Creacion de Producto</Typography>
                <Stack my={4} alignItems="center" textAlign="center" spacing={2}>
                    <TextField
                        label="Nombre Producto"
                        type="text"
                        onChange={onChange}
                        name="nombre"
                        variant="outlined"
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        label="Costo"
                        type="Number"
                        onChange={onChange}
                        name="costo"
                        rows={1}
                        variant="outlined"
                        sx={{ width: '300px' }}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        label="Precio Venta"
                        type="Number"
                        onChange={onChange}
                        name="precio_venta"
                        rows={1}
                        variant="outlined"
                        sx={{ width: '300px' }}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        label="Stock"
                        type="Number"
                        onChange={onChange}
                        name="stock"
                        rows={1}
                        variant="outlined"
                        sx={{ width: '300px' }}
                        inputProps={{ min: 0 }}
                    />
                    <FormControl fullWidth>
                    <InputLabel id="category-label">Categoría</InputLabel>
                    <Select
                        label="Categoria"
                        labelId="category-label"
                        onChange={onChange}
                        name="categoria"
                        autoWidth
                        sx={{
                        width: "300px",
                        backgroundColor: '#fffff',
                        '& .MuiSelect-icon': {
                        color: '#555555',
                        },
                    }}
                    >
                    {loading ? (
                    <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                    ) : (
                    <MenuItem value="">
                        <em>Seleccione una categoría</em>
                    </MenuItem>
                    )}
                    {valcat.categories &&
                    valcat.categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.name}
                        </MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" >
                        <Button variant="contained" color="primary" onClick={onSubmit}>Crear</Button>
                        <Button variant="contained" color="error" onClick={publicacionRouter}>Cancelar</Button>
                    </Stack>
                </Stack>
            </Container>
            </Card>
        </Stack>
    )
}



export default CreatePublicacion