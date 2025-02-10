import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [universidades, setUniversidades] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [selectedUniversidad, setSelectedUniversidad] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/universidades/')
      .then(response => setUniversidades(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleUniversidadChange = (event) => {
    const universidadId = event.target.value;
    setSelectedUniversidad(universidadId);
    axios.get(`http://localhost:8000/api/documentos/?universidad_id=${universidadId}`)
      .then(response => setDocumentos(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Gestión de Documentos</h1>
      <select onChange={handleUniversidadChange} value={selectedUniversidad}>
        <option value="">Seleccione una universidad</option>
        {universidades.map(universidad => (
          <option key={universidad.id} value={universidad.id}>{universidad.nombre}</option>
        ))}
      </select>
      <ul>
        {documentos.map(documento => (
          <li key={documento.id}>
            {documento.nombre_archivo} - {documento.estado_aprobacion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
