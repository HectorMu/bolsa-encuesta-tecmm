import { useState } from "react";
import toast from "react-hot-toast";

//Importando componentes
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

//Importando servicios
import Auth from "@/services/Auth";

const Form = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Validando datos y enviando correo...");
    const results = await Auth.sendRecoverEmail(email);
    if (!results.status) {
      toast.error(results.statusText, { id: tLoading });
      return;
    }
    toast.success(results.statusText, { id: tLoading });
  };
  return (
    <form className="user" onSubmit={handleSubmit} autoComplete="off">
      <FloatingLabelInput
        inputId="txtCorreo"
        type="email"
        placeholder="Correo Electronico"
        setClass="rounded-pill"
        setValue={(e) => setEmail(e.target.value)}
        value={email}
      />

      <button type="submit" className="btn btn-primary btn-user btn-block">
        Enviar
      </button>
    </form>
  );
};

export default Form;
