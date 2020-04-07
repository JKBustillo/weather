import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consulta, setConsulta] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  const apikey= '48b0db1c2cfc73f8bd949075c5a2d5a3';

  useEffect(() => {
    const consultarAPI = async () => {
      if (ciudad !== '') {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        
        // Validación consulta
        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consulta]);

  let componente;

  if (error) {
    componente = <Error mensaje="No hay resultados"/>
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header
        titulo="Clima App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                consulta={consulta}
                setConsulta={setConsulta}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
