import { useState } from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const reset = () => setForm(initialState);

  const handleChange = ({ target }) =>
    setForm({
      ...form,
      [target.name]: Number(target.value)
        ? parseInt(target.value)
        : target.value,
    });

  return { form, setForm, handleChange, reset };
};

export default useForm;
