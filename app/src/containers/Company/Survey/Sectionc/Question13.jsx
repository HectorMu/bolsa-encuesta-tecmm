const Question13 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>{questions[3]?.descripcion}:</h5>

      <div className="form-group">
        <textarea
          rows="5"
          className="form-control"
          placeholder="Escribe aqui los comentarios y sugerencias..."
          onChange={(e) => handleChange("respuesta13", e.target.value)}
          value={answers.respuesta13}
        ></textarea>
      </div>
    </div>
  );
};

export default Question13;
