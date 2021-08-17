import AuthHeader from '../AuthHeader/AuthHeader';
import FormField from '../FormField/FormField';
import ResponseMessage from '../ResponseMessage/ResponseMessage';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import useFormAndValidation from '../../hooks/useFormValidation';
import { useEffect } from 'react';

function Login({ handleLogin, response, resetResponse, isRequestLoading }) {
  const formAndValidation = useFormAndValidation();

  useEffect(() => {
    formAndValidation.setIsValid(false);

    return () => {
      resetResponse();
    };
  }, []);

  function handleChange(e) {
    formAndValidation.handleChange(e);
    resetResponse();
  }

  function handleEmailChange(e) {
    formAndValidation.handleEmailChange(e);
    resetResponse();
  }

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
          onChange={handleEmailChange}
          name="email"
          value={formAndValidation.values.email || ''}
          errorText={formAndValidation.errors.email}
          disabled={isRequestLoading}
        />
        <FormField
          fieldName="Пароль"
          fieldType="password"
          placeholder="Введите ваш пароль"
          onChange={handleChange}
          name="password"
          value={formAndValidation.values.password || ''}
          errorText={formAndValidation.errors.password}
          disabled={isRequestLoading}
        />
        <ResponseMessage response={response} />
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
