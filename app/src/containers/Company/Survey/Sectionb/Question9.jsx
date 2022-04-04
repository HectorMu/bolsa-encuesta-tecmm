const Question9 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>{questions[4]?.descripcion}:</h5>

      <div className="form-group">
        <textarea
          rows="5"
          className="form-control"
          placeholder="Escribelas aqui..."
          onChange={(e) => handleChange("respuesta9", e.target.value)}
          value={answers.respuesta9}
        ></textarea>
      </div>
    </div>
  );
};

export default Question9;
