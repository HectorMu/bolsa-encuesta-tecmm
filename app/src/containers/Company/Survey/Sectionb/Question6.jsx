import FloatingLabelInput from "@/components/Global/FloatingLabelInput";
import careers from "./careers.json";

const ENTRIES = {
  mando_superior: "Mando superior",
  mando_intermedio: "Mando intermedio",
  supervisor: "Supervisor o equivalente",
  tecnico_auxiliar: "Tecnico o Auxiliar",
  otros_p6: "Otros",
};

const Question6 = ({ handleP6DetailsChange, questions }) => {
  return (
    <div>
      <h5>{questions[1]?.descripcion}:</h5>
      <div className="row">
        <div className="col-12 col-lg-12 col-md-12 col-xl-12">
          <select
            className="form-control form-select mb-3"
            style={{ height: "47px" }}
            onChange={(e) => handleP6DetailsChange("carrera", e.target.value)}
          >
            <option>Carrera (Seleccione una opcion)</option>
            {careers.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {Object.entries(ENTRIES).map(([key, value]) => (
          <div key={key} className="col-6 col-lg-3 col-md-3 col-xl-3">
            <FloatingLabelInput
              ranges={{ min: 0, max: 100 }}
              placeholder={value}
              inputId={`input${key}`}
              type="number"
              setValue={(e) => handleP6DetailsChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question6;
