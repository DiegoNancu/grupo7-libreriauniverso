import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import ResultsProduct from "./pages/ResultsProduct";
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListProducts" element={<ListProducts />} />
        <Route path="/results/:nameP" element={<ResultsProduct />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;