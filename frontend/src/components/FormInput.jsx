function FormInput({ onChange, errorMsg, value, ...inputProps }) {
  const handleChange = (e) => onChange(e);

  return (
    <>
      <input {...inputProps} onChange={handleChange} value={value} />
      <p
        className={`form__input-error ${
          errorMsg?.length ? "form__input-error_active" : ""
        }`}
      >
        {errorMsg}
      </p>
    </>
  );
}

export default FormInput;
