import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="ListProducts" element={<ListProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;