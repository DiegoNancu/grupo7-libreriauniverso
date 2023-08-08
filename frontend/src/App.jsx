import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ListProducts from "./pages/ListProducts";
import ResultsProduct from "./pages/ResultsProduct";
import Chat from './pages/Chat';
import CreateP from './pages/CreateP';
import UpdateP from './pages/UpdateP';
import AdminP from './pages/AdminP';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;