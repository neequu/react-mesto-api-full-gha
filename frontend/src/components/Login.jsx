import AuthForm from "./AuthForm";

function Login({ onLogin, isLoading }) {
  const handleSubmit = (email, password) => onLogin(email, password);

  return (
    <AuthForm
      title="Вход"
      buttonText={isLoading ? "Загрузка..." : "Войти"}
      onSubmit={handleSubmit}
    />
  );
}

export default Login;
