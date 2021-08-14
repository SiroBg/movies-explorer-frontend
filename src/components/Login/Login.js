import AuthHeader from '../AuthHeader/AuthHeader';
import FormField from '../FormField/FormField';
import ResponseError from '../ResponseError/ResponseError';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import useFormAndValidation from '../../hooks/useFormValidation';
import { useEffect } from 'react';

function Login({ handleLogin, responseError }) {
  const formAndValidation = useFormAndValidation();

  useEffect(() => {
    formAndValidation.setIsValid();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(
      formAndValidation.values.email,
      formAndValidation.values.password
    );
    formAndValidation.resetForm();
  }

  return (
    <main className="login">
      <AuthHeader title="Рады видеть!" />
      <form
        className="login__form"
        method="post"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormField
          fieldName="E-mail"
          fieldType="email"
          placeholder="Введите ваш e-mail"
          onChange={formAndValidation.handleChange}
          name="email"
          value={formAndValidation.values.email || ''}
          errorText={formAndValidation.errors.email}
        />
        <FormField
          fieldName="Пароль"
          fieldType="password"
          placeholder="Введите ваш пароль"
          onChange={formAndValidation.handleChange}
          name="password"
          value={formAndValidation.values.password || ''}
          errorText={formAndValidation.errors.password}
        />
        <ResponseError errorText={responseError} />
        <AuthSubmit
          submitBtnText="Войти"
          subText="Ещё не зарегистрированы? "
          linkText="Регистрация"
          linkPath="/signup"
          isValid={formAndValidation.isValid}
        />
      </form>
    </main>
  );
}

export default Login;
