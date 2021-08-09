import AuthHeader from '../AuthHeader/AuthHeader';
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
          minLength="2"
          maxLength="30"
        />
        <FormField fieldName="E-mail" fieldType="email" />
        <FormField fieldName="Пароль" fieldType="password" />
        <ResponseError isActive />
      </form>
    </main>
  );
}

export default Register;
