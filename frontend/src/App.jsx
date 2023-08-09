import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import AddProduct from "./pages/admin/adminProducts";
import Chat from './pages/Chat';
import Vproduct from './pages/Vproduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Vproduct" element={<Vproduct />} />
        <Route path="/ListProducts" element={<ListProducts />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;