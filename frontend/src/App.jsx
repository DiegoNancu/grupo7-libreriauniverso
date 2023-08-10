import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import ResultsProduct from "./pages/ResultsProduct";
import Chat from './pages/Chat';
import Vproduct from './pages/Vproduct';
import CreateP from './pages/CreateP';
import UpdateP from './pages/UpdateP';
import AdminP from './pages/AdminP';
import HistorialCompras from './pages/historial_compras_version_2'
import SignUp from './pages/sign_up'
import Login from './pages/login';
import Reclamos from './pages/Reclamos'
import ChatAdmin from './pages/admin/ChatAdmin';
import Vproduct from './pages/Vproduct';
import CompraPro from './pages/CompraPro';
import ChatAdminUserList from './pages/admin/ChatAdminUserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Vproduct" element={<Vproduct />} />
        <Route path="/CreatePubli" element={<CreateP />} />
        <Route path="/UpdatePubli" element={<UpdateP />} />
        <Route path="/AdminPubli" element={<AdminP />} />
        <Route path="/ListProducts" element={<ListProducts />} />
        <Route path="/results/:nameP" element={<ResultsProduct />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/ChatAdmin" element={<ChatAdmin />} />
        <Route path="/ChatAdminUserList" element={<ChatAdminUserList />} />
        <Route path="/HistorialCompras" element={<HistorialCompras />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Reclamos" element={<Reclamos/>}/>
        <Route path="/Vproduct/:id" element={<Vproduct />} />
        <Route path="/cart/:id/:cantidad" element={<CompraPro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;