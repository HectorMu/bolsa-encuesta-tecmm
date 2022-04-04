const Question5 = ({ answers, handleChange, questions }) => {
  return (
    <div className="pb-4">
      <h5>{questions[0]?.descripcion}:</h5>
      <select
        className="form-control form-select mb-3"
        style={{ height: "47px" }}
        onChange={(e) => handleChange("respuesta5", e.target.value)}
        value={answers.respuesta5}
      >
        <option value={""}>Número profesionistas(Seleccione una opción)</option>
        <option value="1">1</option>
        <option value="De 2 a 5">De 2 a 5</option>
        <option value="De 6 a 8">De 6 a 8</option>
        <option value="De 9 a 10">De 9 a 10</option>
        <option value="Más de 10">Más de 10</option>
      </select>
    </div>
  );
};

export default Question5;
