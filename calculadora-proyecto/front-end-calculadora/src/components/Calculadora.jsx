import { useState } from "react";
import "../styles/Calculadora.css";
import Resultado from "./Resultado";
import imagen from "../assets/gorda.jpg";
import imagen2 from "../assets/flaca.jpg";

function Calculadora() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleEdadChange = (event) => {
    setEdad(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const operacion = e.target.value;
    fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ peso, altura, nombre, apellido, edad }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        setResultado(responseData.resultado);
        // setResultado(responseData)
        // console.log(resultado)
        if (resultado > 10) {
          document.getElementById("mi_imagen").style.display = "block";
          document.getElementById("mi_imagen2").style.display = "none";
        } else {
          document.getElementById("mi_imagen").style.display = "none";
          document.getElementById("mi_imagen2").style.display = "block";
        }
      });
  }

  return (
    <div className="container">
      <h1 id="txtCalculadora">CALCULAR TU IMC</h1>
      <form>
        <input
          type="text"
          className="texto"
          placeholder="Digita tu nombre"
          onChange={handleNombreChange}
        />
        <br />
        <input
          type="text"
          className="texto"
          placeholder="Digita tu apellido"
          onChange={handleApellidoChange}
        />
        <br />
        <input
          type="text"
          className="number"
          placeholder="Digita tu edad"
          onChange={handleEdadChange}
        />
        <br />
        <input
          type="text"
          className="number"
          placeholder="Digita tu peso en kg"
          onChange={(e) => {
            setPeso(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          className="number"
          placeholder="Digita tu altura en cm"
          onChange={(e) => {
            setAltura(e.target.value);
          }}
        />
        <br />
        <input
          type="submit"
          className="btnEnviar"
          value="Calcular"
          onClick={handleSubmit}
        />
      </form>
      <Resultado resultado={"El resultado es:  " + resultado} />
      <img src={imagen} alt="Persona gorda" id="mi_imagen" className="img" />
      <img src={imagen2} alt="Persona flaca" id="mi_imagen2" className="img" />
    </div>
  );
}

export default Calculadora;
