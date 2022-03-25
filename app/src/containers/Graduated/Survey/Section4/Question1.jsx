import FloatingLabelInput from "../../../../components/Global/FloatingLabelInput";

const Question1 = ({ handleChange, answers, questions }) => {
  console.log(answers);
  return (
    <div className="pb-4">
      <h5>{questions[0]?.descripcion}:</h5>
      <div className="row align-items-center">
        <div className="col-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`cbxCursos`}
              onChange={() => handleChange("respuesta1", "Si")}
              id={`cbxCursosSi`}
            />
            <label className="form-check-label" htmlFor={`cbxCursosSi`}>
              Si
            </label>
          </div>
        </div>
        {answers.respuesta1 === "Si" ? (
          <div className="col-8">
            <FloatingLabelInput
              inputId="txtCualesCursos"
              placeholder="Que cursos?"
              setValue={(e) => handleChange("cursos", e.target.value)}
              value={answers.cursos}
            />
          </div>
        ) : null}
        <div className="col-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`cbxCursos`}
              onChange={() => handleChange("respuesta1", "No")}
              id={`cbxCursosNo`}
            />
            <label className="form-check-label" htmlFor={`cbxCursosNo`}>
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question1;
