import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePublicacion from './pages/create/createpublicacion';
import UpdatePro from './pages/updatePublicacion/updatePublicacion';
import PublicacionAdmin from "./pages/options/PublicacionAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/CreatePubli" element={<CreatePublicacion />} />
        <Route path="/UpdatePubli" element={<UpdatePro />} />
        <Route path="/AdminPubli" element={<PublicacionAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
