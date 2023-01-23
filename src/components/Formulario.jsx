import { useEffect, useState } from "react";

import styled from "@emotion/styled";

import Error from "./Error";

import useSelectMonedas from "../hooks/useSelectMonedas";

import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #7a7dfe;
  }
`;

const Formulario = ({setMonedas}) => {
  // state para añadir el array de criptomonedas a criptos, una vez que se ejecute el useeffect
  const [criptos, setCriptos] = useState([]);

  // useState para el control de errores en la validacion
  const [error, setError] = useState(false);

  // State para seleccionar la moneda en el Select
  // moneda === state => Que viene desde useSelectMonedas.jsx (se le aplica el nombre de "moneda" para ser mas claro, al ser un componente reutilizable)
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);

  // State para seleccionar la criptomoneda en el Select
  // criptomoneda === state => Que viene desde useSelectMonedas.jsx (se le aplica el nombre de "criptomoneda" para ser mas claro, al ser un componente reutilizable)
  const [criptomoneda, SelectCriptoMonedas] = useSelectMonedas(
    "Elige tu CriptoMoneda",
    criptos
  );

  // useEffect para realizar la llamada a la API y obtener los resultado mediante Fetch
  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };

    consultarAPI();
  }, []);

  // Funcion para validar el formulario

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si hay algun error muestra la alerta durante 5 segundos
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 5000);
      
      return;
    }

    // Si no hay errores, el mensaje de error pasa a false (en caso de que fuese true)
    setError(false)

    // Se construye el objeto con la moneda y la criptomoneda
    setMonedas({
      moneda,
      criptomoneda
    })
  };

  return (
    <>
      {error && <Error>Todos los campos son necesarios</Error>}

      <form onSubmit={handleSubmit}>
        <SelectMonedas />

        <SelectCriptoMonedas />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
