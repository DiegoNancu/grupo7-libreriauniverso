import React from 'react';
import NavBar from '../components/NavBar';

const Home = () => {
  // Generar valores aleatorios para la información
  const lugar = 'Concepcion, Talcahuano';
  const numero = '123456789';

  return (
    <div>
      <NavBar />
      <div style={styles.headerContainer}>
        <img
          src="https://dismartgt.com/cdn/shop/articles/papeleria-1_66fe77df-9580-4bae-9e3c-4ce0f59fa290_800x.jpg?v=1576388705"
          alt="Imagen de cabecera"
          style={styles.headerImage}
        />
      </div>
      <div style={styles.infoContainer}>
        <h1 style={styles.infoHeading}>Más Información</h1>
        <div style={styles.infoContent}>
          <div style={styles.infoText}>
            <h2>Lugar: {lugar}</h2>
            <p>Número: {numero}</p>
          </div>
          <div style={styles.mapImageContainer}>
            <img
              src="https://www.entornoturistico.com/wp-content/uploads/2023/05/Mapa-de-Me%CC%81xico-con-nombres.jpg"
              alt="Mapa"
              style={styles.mapImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '80px'
  },
  headerImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  infoHeading: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '48px',
    fontWeight: 600,
    lineHeight: '64px',
    marginBottom: '20px',
  },
  infoContent: {
    display: 'flex',
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'left',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  mapImageContainer: {
    marginLeft: 'auto',  // Ajuste para alinear a la derecha
  },
  mapImage: {
    marginLeft: '220px',
    maxWidth: '60%',
    height: 'auto',
    borderRadius: '20px',
  },
};
