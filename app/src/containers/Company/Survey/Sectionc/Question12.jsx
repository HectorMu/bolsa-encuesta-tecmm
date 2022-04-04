const Question12 = ({ handleChange, answers, questions }) => {
  return (
    <div className="pb-4">
      <h5>{questions[2]?.descripcion}:</h5>

      <div className="form-group">
        <textarea
          rows="5"
          className="form-control"
          placeholder="Escribelas aqui..."
          onChange={(e) => handleChange("respuesta12", e.target.value)}
          value={answers.respuesta12}
        ></textarea>
      </div>
    </div>
  );
};

export default Question12;
