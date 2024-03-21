import { useState } from "react";
import "../styles/Calculadora.css";
import Resultado from "./Resultado";
import imagen from "../assets/gorda.jpg";
import imagen2 from "../assets/flaca.jpg";
import imagen3 from "../assets/normal.jpg";
import imagen4 from "../assets/sobrepeso2.jpg";
import imagen5 from "../assets/sobrepeso3.jpg";

function Calculadora() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");
  const [mensaje, setMensaje] = useState("");

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
        if (resultado < 18.5) {
          // Bajo de peso
          document.getElementById("mi_imagen2").style.display = "block";
          document.getElementById("mi_imagen").style.display = "none";
          document.getElementById("mi_imagen3").style.display = "none";
          document.getElementById("mi_imagen4").style.display = "none";
          document.getElementById("mi_imagen5").style.display = "none";
          setMensaje("Baja de peso");

        } else if (resultado >= 18.5 && resultado <= 24.9) {
          // Normal
          document.getElementById("mi_imagen").style.display = "none";
          document.getElementById("mi_imagen3").style.display = "block";
          document.getElementById("mi_imagen2").style.display = "none";
          document.getElementById("mi_imagen4").style.display = "none";
          document.getElementById("mi_imagen5").style.display = "none";
          setMensaje("saludable");

        } else if (resultado >= 25 && resultado <= 29.9) {
          // Gorda
          document.getElementById("mi_imagen2").style.display = "none";
          document.getElementById("mi_imagen").style.display = "block";
          document.getElementById("mi_imagen3").style.display = "none";
          document.getElementById("mi_imagen4").style.display = "none";
          document.getElementById("mi_imagen5").style.display = "none";
          setMensaje("sobrepeso1");

        } else if (resultado >= 30 && resultado <= 39.9) {
          // Sobrepeso 2
          document.getElementById("mi_imagen3").style.display = "none";
          document.getElementById("mi_imagen4").style.display = "block";
          document.getElementById("mi_imagen").style.display = "none";
          document.getElementById("mi_imagen2").style.display = "none";
          document.getElementById("mi_imagen5").style.display = "none";
          setMensaje("sobrepeso2");
        } else {
          // Mayor a 40, Sobrepeso 3
          document.getElementById("mi_imagen5").style.display = "none";
          document.getElementById("mi_imagen").style.display = "block";
          document.getElementById("mi_imagen3").style.display = "none";
          document.getElementById("mi_imagen4").style.display = "none";
          document.getElementById("mi_imagen2").style.display = "none";
          setMensaje("sobrepeso3");
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
      <p>{mensaje}</p>
      <img src={imagen} alt="Persona gorda" id="mi_imagen" className="img" />
      <img src={imagen2} alt="Persona flaca" id="mi_imagen2" className="img" />
      <img src={imagen3} alt="Persona normal" id="mi_imagen3" className="img" />
      <img src={imagen4} alt="Persona sobrepso2" id="mi_imagen4" className="img" />
      <img src={imagen5} alt="Persona sobrepso3" id="mi_imagen5" className="img" />
    </div>
  );
}

export default Calculadora;
