import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import ResultsProduct from "./pages/ResultsProduct";
import Chat from './pages/Chat';
import CreateP from './pages/CreateP';
import UpdateP from './pages/UpdateP';
import AdminP from './pages/AdminP';
import HistorialCompras from './pages/historial_compras_version_2'
import SignUp from './pages/sign_up'
import Login from './pages/login';
import Reclamos from './pages/Reclamos'
import ChatAdmin from './pages/admin/ChatAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreatePubli" element={<CreateP />} />
        <Route path="/UpdatePubli" element={<UpdateP />} />
        <Route path="/AdminPubli" element={<AdminP />} />
        <Route path="/ListProducts" element={<ListProducts />} />
        <Route path="/results/:nameP" element={<ResultsProduct />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/ChatAdmin" element={<ChatAdmin />} />
        <Route path="/HistorialCompras" element={<HistorialCompras />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Reclamos" element={<Reclamos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;