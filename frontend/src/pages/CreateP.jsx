import NavBar from '../components/NavBar';

import '../App.css';
import CreatePublicacion from './create/createpublicacion';


const CreateP = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container">
        <div className="content">
            <CreatePublicacion/>
        </div>
      </div>
    </div>
  );
}

export default CreateP;
