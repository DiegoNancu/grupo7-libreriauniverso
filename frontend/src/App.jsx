import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import AddProduct from "./pages/admin/adminProducts";
import Chat from './pages/Chat';
import HistorialCompras from './pages/historial_compras_version_2'
import SignUp from './pages/sign_up'
import Login from './pages/login';
import Reclamos from './pages/Reclamos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListProducts" element={<ListProducts />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/HistorialCompras" element={<HistorialCompras />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Reclamos" element={<Reclamos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;