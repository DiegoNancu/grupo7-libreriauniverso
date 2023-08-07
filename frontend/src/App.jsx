import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import UpdatePro from './pages/updatePublicacion/updatePublicacion';
import PublicacionAdmin from "./pages/options/PublicacionAdmin";
import ListProducts from "./pages/ListProducts";
import AddProduct from "./pages/admin/adminProducts";
import Chat from './pages/Chat';
import CreateP from './pages/CreateP';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreatePubli" element={<CreateP />} />
        <Route path="/UpdatePubli" element={<UpdatePro />} />
        <Route path="/AdminPubli" element={<PublicacionAdmin />} />
        <Route path="/ListProducts" element={<ListProducts />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;