import React from 'react';
import './Dau.css'; // Importem l'arxiu CSS per aplicar els estils

const Dau = ({ valor }) => {
  return <div className={`Dau Dau--${valor}`}>{valor}</div>;
};

export default Dau;
