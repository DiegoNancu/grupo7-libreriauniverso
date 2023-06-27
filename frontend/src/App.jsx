import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import Other from "./pages/Other";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/ListProducts" element={<ListProducts />} />
          <Route path="/other" element={<Other />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;