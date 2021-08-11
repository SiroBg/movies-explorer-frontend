import AuthHeader from '../AuthHeader/AuthHeader';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import FormField from '../FormField/FormField';
import ResponseError from '../ResponseError/ResponseError';

function Register() {
  return (
    <main className="register">
      <AuthHeader title="Добро пожаловать!" />
      <form className="register__form" method="post">
        <FormField
          fieldName="Имя"
          fieldType="text"
          placeholder="Введите ваше имя"
          minLength="2"
          maxLength="30"
        />
        <FormField
          fieldName="E-mail"
          fieldType="email"
          placeholder="Введите ваш e-mail"
        />
        <FormField
          fieldName="Пароль"
          fieldType="password"
          placeholder="Придумайте пароль"
        />
        <ResponseError isActive />
        <AuthSubmit
          submitBtnText="Зарегистрироваться"
          subText="Уже зарегистрированы? "
          linkText="Войти"
          linkPath="/signin"
        />
      </form>
    </main>
  );
}

export default Register;
