import styled from "@emotion/styled";

const Contenedor = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;

  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const Texto = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;

const Precio = styled.p`
  font-size: 30px;
  span {
    font-weight: 700;
  }
`;

const Imagen = styled.img`
    width: 120px;

`

const Resultado = ({ resultado }) => {
  const { PRICE, LASTUPDATE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL } =
    resultado;

  return (
    <Contenedor>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="Logo Criptomoneda"
      />
      <div>
        <Precio>
          El precio actual es de: <span>{PRICE}</span>
        </Precio>
        <Texto>
          El precio más alto del día fue de: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          El precio más bajo del día fue de: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación de las últimas 24h: <span>{CHANGEPCT24HOUR}%</span>
        </Texto>
        <Texto>
          Última actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Contenedor>
  );
};

export default Resultado;
