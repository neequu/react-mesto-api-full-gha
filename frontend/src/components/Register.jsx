import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onRegister, isLoading }) {
  const handleSubmit = (email, password) => onRegister(email, password);

  return (
    <AuthForm
      title="Регистрация"
      buttonText={isLoading ? "Создание аккаунта..." : "Зарегистрироваться"}
      onSubmit={handleSubmit}
    >
      <p>
        Уже зарегистрированы?{" "}
        <Link className="form__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
