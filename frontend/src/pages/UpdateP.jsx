import NavBar from '../components/NavBar';

import '../App.css';
import UpdatePro from './updatePublicacion/updatePublicacion';


const UpdateP = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container">
        <div className="content">
            <UpdatePro/>
        </div>
      </div>
    </div>
  );
}

export default UpdateP;