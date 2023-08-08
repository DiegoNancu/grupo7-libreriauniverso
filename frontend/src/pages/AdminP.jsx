import NavBar from '../components/NavBar';

import '../App.css';
import PublicacionAdmin from './options/PublicacionAdmin';


const AdminP = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container">
        <div className="content">
            <PublicacionAdmin/>
        </div>
      </div>
    </div>
  );
}

export default AdminP;