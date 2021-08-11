import AuthHeader from '../AuthHeader/AuthHeader';
import FormField from '../FormField/FormField';
import ResponseError from '../ResponseError/ResponseError';
import AuthSubmit from '../AuthSubmit/AuthSubmit';

function Login() {
  return (
    <main className="login">
      <AuthHeader title="Рады видеть!" />
      <form className="login__form" method="post">
        <FormField
          fieldName="E-mail"
          fieldType="email"
          placeholder="Введите ваш e-mail"
        />
        <FormField
          fieldName="Пароль"
          fieldType="password"
          placeholder="Введите ваш пароль"
        />
        <ResponseError isActive />
        <AuthSubmit
          submitBtnText="Войти"
          subText="Ещё не зарегистрированы? "
          linkText="Регистрация"
          linkPath="/signup"
        />
      </form>
    </main>
  );
}

export default Login;
