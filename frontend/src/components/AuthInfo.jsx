function AuthInfo({ email, signOut, isActive }) {
  return (
    <div
      className={`header__auth-overlay ${
        isActive ? "header__auth-overlay_active" : ""
      }`}
    >
      <div
        className={`header__auth-container ${
          isActive ? "header__auth-container_active" : ""
        }`}
      >
        {email}
        <button
          type="button"
          className="header__signout-button"
          onClick={signOut}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export default AuthInfo;
