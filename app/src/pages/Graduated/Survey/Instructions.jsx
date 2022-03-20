import React from "react";
import { Link } from "react-router-dom";

const Survey = () => {
  return (
    <div className="container-fluid text-black">
      <div className="d-sm-flex align-items-center justify-content-center mb-4">
        <h1 className="h3 mb-0 text-center font-weight-bold border-bottom border-dark border-1 pb-2">
          Cuestionario de seguimiento de egresados
        </h1>
      </div>
      <h3 className="text-left ">Instrucciones:</h3>
      <p>
        Por favor lea cuidadosamente y conteste este cuestionario de la
        siguiente manera, segun sea el caso:
      </p>
      <ol start={1} className="font-weight-bold text-justify instructions-list">
        <li>
          En el caso de preguntas cerradas, seleccione la opcion que considere
          apropiada.
        </li>
        <li>
          En las preguntas de valoracion la escala utilizada es del 1 al 5, en
          la que 1 es igual a "muy malo" y 5 es "muy bueno"
        </li>
        <li>
          En los casos de preguntas abiertas dejamos un campo de texto para que
          escriba con mayuscula una respuesta.
        </li>
        <li>
          Al final anexamos un inciso para comentarios y sugerencias, le
          agradeceremos que escriba lo que considere prudente para mejorar
          nuestro sistema educativo o bien los temas que, a su juicio, hayamos
          omitido en el cuestionario
        </li>
      </ol>
      <p>
        Gracias por su gentil colaboracion, una vez este listo, presione el
        boton para comenzar.
      </p>
      <div className="d-flex justify-content-center h-100 mt-4">
        <Link
          to={"/graduated/survey/section/1"}
          className={"btn btn-primary btn-lg"}
        >
          Comenzar <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Survey;
