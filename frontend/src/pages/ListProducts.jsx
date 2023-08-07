import NavBar from '../components/NavBar';
import GirdPro from '../components/GirdPro';

import '../App.css';


const ListProducts = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container">
        <div className="content">
          <GirdPro />
        </div>
      </div>
    </div>
  );
}

export default ListProducts;
