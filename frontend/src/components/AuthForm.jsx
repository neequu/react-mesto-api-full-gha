import FormInput from "./FormInput";
import useFormValidation from "../utils/useFormValidation.js";

function AuthForm({ onSubmit, title, buttonText, children }) {
  const { values, error, handleChange } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="form form_auth" onSubmit={handleSubmit}>
      <fieldset className="form__set">
        <h2 className="form__title">{title}</h2>

        <FormInput
          id="auth-email"
          name="email"
          type="email"
          placeholder="Email"
          className="form__input form__input_dark"
          required
          onChange={handleChange}
          errorMsg={error.email}
          autoComplete="username"
          value={values.email || ""}
        />

        <FormInput
          id="auth-password"
          type="password"
          placeholder="Пароль"
          className="form__input form__input_dark"
          name="password"
          required
          minLength="5"
          maxLength="15"
          onChange={handleChange}
          errorMsg={error.password}
          pattern="^\S*$"
          autoComplete="current-password"
          value={values.password || ""}
        />
      </fieldset>
      <button
        type="submit"
        className="form__submit-button form__submit-button_dark"
      >
        {buttonText}
      </button>
      {children}
    </form>
  );
}

export default AuthForm;
