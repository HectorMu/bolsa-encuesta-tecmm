import { useState } from "react";
import toast from "react-hot-toast";

//Importando componentes
import FloatingLabelInput from "@/components/Global/FloatingLabelInput";

//Importando servicios
import Auth from "@/services/Auth";

//Importando hooks
import useRouterHooks from "@/hooks/useRouterHooks";

const Form = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { params, navigate } = useRouterHooks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await Auth.resetPasswordAccount(
      { password, confirm },
      params.token
    );

    if (!results.status) {
      toast.error(results.statusText);
      navigate("/login");
      return;
    }

    toast.success(results.statusText);
    navigate("/login");
  };
  return (
    <form className="user" onSubmit={handleSubmit} autoComplete="off">
      <FloatingLabelInput
        inputId="txtClave"
        type="password"
        placeholder="Contraseña"
        setClass="rounded-pill"
        setValue={(e) => setPassword(e.target.value)}
        value={password}
      />
      <FloatingLabelInput
        inputId="txtConfirmar"
        type="password"
        placeholder="Confirmar contraseña"
        setClass="rounded-pill"
        setValue={(e) => setConfirm(e.target.value)}
        value={confirm}
      />

      <button type="submit" className="btn btn-primary btn-user btn-block">
        Cambiar contraseña
      </button>
    </form>
  );
};

export default Form;
