import { useState } from "react";

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const t = e.target;
    setError({ ...error, [t.name]: t.validationMessage });
    setValues({ ...values, [t.name]: t.value });
  };

  const resetForm = () => {
    setError({});
    setValues({});
  };

  return { values, error, resetForm, handleChange, setValues };
};

export default useFormValidation;
