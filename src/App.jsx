import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./Materiales Criptos/img/imagen-criptos.png";

import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

// Styled Components

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  // Crea una linea inmediatamente debajo del h1
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0;
  }
`;

// ---------------------------------------------------------------------------- //

function App() {
  //useState para crear un objeto con las elecciones del select de la moneda y la cripto
  const [monedas, setMonedas] = useState({});

  //useState para crear un objeto con el resultado de la llamada a la API
  const [resultado, setResultado] = useState({});

  // useState para añadir un spinner mientras carga la información
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    //Si hay algo en el objeto construido con la moneda y la cripto, se ejecuta el effect
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {

        //El estado del state de cargando pasa a true
        setCargando(true)

        // Reseteamos el anterior resultado
        setResultado({})

        // Se extrae la moneda y la cripto elegidas en el select/array de monedas
        const { moneda, criptomoneda } = monedas;

        // Llamada a la API con las opciones elegidas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);

        const resultado = await respuesta.json();

        // Esto busca en el objeto respuesta los resultados que sean iguales a lo que las variables de criptomoneda y moneda contengan
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);

        // El estado de cargando pasa a false una vez ha acabado
        setCargando(false)

      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="Logo" />

      <div>
        <Heading>Cotiza Criptomonedas en el momento</Heading>
        <Formulario setMonedas={setMonedas} />

        {cargando && <Spinner />}
        {/* // Si el objeto de resultado ya se ha creado, comprueba si existe el acceso a la propiedad de PRICE y muestra el componente */}
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>
    </Contenedor>
  );
}

export default App;
