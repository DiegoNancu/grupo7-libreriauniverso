import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import AddProduct from "./pages/admin/adminProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListProducts" element={<ListProducts />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;