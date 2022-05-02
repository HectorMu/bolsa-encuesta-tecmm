import { useCallback, useEffect, useState } from "react";
import useForm from "@/hooks/useForm";
import toast from "react-hot-toast";

//Importando hooks
import useSession from "@/hooks/useSession";
import useRouterHooks from "@/hooks/useRouterHooks";

//Componentes personalizados para agilizar la construccion al reutilizarlos
import FormCard from "@/components/Global/FormCard";
import RegisterForm from "@/components/Graduated/RegisterForm";
import Loading from "@/components/Global/Loading";
import ErrorDisplayer from "@/components/Global/ErrorDisplayer";

//Entradas del formulario, es un objeto con los datos a capturar el en formulario
import { Entries, NestedEntries } from "@/components/Graduated/RegisterForm";

//importando servicios
import graduatesService from "@/services/Admin/graduates.service";

const Form = () => {
  const { verifySession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const {
    form: graduated,
    setForm: setGraduated,
    handleChange: handleEntriesChange,
  } = useForm(Entries);

  //aqui usamos un estado aparte para manejar el cambio de del idioma extranjero,
  //Ya que es una propiedad anidada dentro dl usuario
  // const [idiomaExtranjero, setIdiomaExtranjero] = useState(
  //   NestedEntries.idioma_extranjero
  // );
  const {
    form: idiomaExtranjero,
    setForm: setIdiomaExtranjero,
    handleChange: handleIdiomaExtranjeroChange,
  } = useForm(NestedEntries.idioma_extranjero);

  //Estado para controlar si el usuario esta editando, usamos un efecto para cambiar este estado
  const [onEditing, toggleEditing] = useState(false);
  //Estado para controlar si el usuario desea cambiar la contraseña,
  //usamos un checkbox para cambiar este estado
  const [onChangePassword, toggleChangePassword] = useState(false);
  //usamos este hook para traer todos los hooks comunes a utilizar de react-router-dom
  const { navigate, location, params } = useRouterHooks();

  //Para obtener un graduado basandonos en el id y filtrando los usuarios desde ahi
  const getGraduatedFromFetch = useCallback(async () => {
    setIsLoading(true);
    const graduatedFetched = await verifySession(
      () => graduatesService.GetOne(params.id),
      getGraduatedFromFetch
    );
    if (graduatedFetched?.error) {
      setGraduated(graduatedFetched);
      setIsLoading(false);
      return;
    }
    if (!graduatedFetched.id) {
      navigate("/graduates");
      toast.error("Este registro no existe.");
      setIsLoading(false);
      return;
    }
    //sacamos el objeto del idioma extranjero para guardarlo en su estado
    //y el resto de propiedades equivalen a las propiedades restantes del usuario
    const { idioma_extranjero, ...rest } = graduatedFetched;

    //seteamos lo anterior dicho en el estado
    setGraduated(rest);
    setIdiomaExtranjero(idioma_extranjero);
    setIsLoading(false);
  }, [params.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //construimos un nuevo objeto para guardar el nuevo graduado
    const newGraduated = {
      //Esta construido de una copia de lo que tenga el graduado
      //lo copiamos asi para que este todo al mismo nivel de propiedad
      ...graduated,
      // y le agregamos la propiedad de idioma_extranjero con todo lo que tenga idiomaExtranjero
      //que es nuestro estado
      idioma_extranjero: idiomaExtranjero,
    };

    const tLoading = toast.loading("Guardando...");
    //Si estamos editando
    if (onEditing) {
      //Si no estamos cambiando la contraseña eliminamos esa propiedad para no enviarla al
      //backend, ya que el backend edita lo que recibe
      if (!onChangePassword) {
        delete newGraduated.clave;
      }

      //como estamos editando, mandamos a llamar el servicio de editar
      const results = await verifySession(() =>
        graduatesService.Update(newGraduated, params.id)
      );
      //si hay un error lo mostramos
      if (!results.status) {
        return toast.error(results.statusText, { id: tLoading });
      }
      toast.success("Egresado editado correctamente.", { id: tLoading });
      navigate("/graduated");
    }
    //Si no estamos editando
    else {
      //como no estamos editando, mandamos a llamar el servicio de guardar
      const results = await verifySession(() =>
        graduatesService.Save(newGraduated)
      );
      //si hay un error lo mostramos
      if (!results.status) {
        return toast.error(results.statusText, { id: tLoading });
      }
      toast.success("Egresado guardado correctamente.", { id: tLoading });
      navigate("/graduated");
    }
  };

  //este efecto se ejecuta cada vez que la ubicacion cambia, ya que
  //necesitamos verificar si el usuario esta en la vista de editar, para cambiar el estado
  //a editar
  useEffect(() => {
    if (location.state !== null) {
      setGraduated(location.state);
      toggleEditing(true);
      return;
    }
    if (location.pathname.includes("edit")) {
      //Si estamos editando, ejecutamos el metodo siguiente para obtener un
      //egresado desde la aPI
      getGraduatedFromFetch();
      //cambiamos el estado de editar a verdadero
      toggleEditing(true);
      return;
    }
    //En caso que este en la vista de guardado, ponemos el cambiar contraseña en true
    //para que se muestren las entradas para la clave al registrar los usuarios
    toggleChangePassword(true);
    //y ponemos el editar en falso ya que estamos guardando
    toggleEditing(false);
  }, [location.pathname, getGraduatedFromFetch, location.state]);

  if (graduated?.error) {
    return isLoading ? (
      <Loading />
    ) : (
      <ErrorDisplayer message={graduated.message} />
    );
  }

  return isLoading ? (
    <Loading />
  ) : (
    <FormCard title={onEditing ? "Editar egresado" : "Datos del egresado"}>
      <RegisterForm
        handleSubmit={handleSubmit}
        graduated={graduated}
        handleEntriesChange={handleEntriesChange}
        handleIdiomaExtranjeroChange={handleIdiomaExtranjeroChange}
        onEditing={onEditing}
        onChangePassword={onChangePassword}
        toggleChangePassword={toggleChangePassword}
        idiomaExtranjero={idiomaExtranjero}
      />
    </FormCard>
  );
};

export default Form;
