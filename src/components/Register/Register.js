import AuthHeader from '../AuthHeader/AuthHeader';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import FormField from '../FormField/FormField';
import ResponseMessage from '../ResponseMessage/ResponseMessage';
import useFormAndValidation from '../../hooks/useFormValidation';
import { useEffect } from 'react';

function Register({
  handleRegister,
  response,
  resetResponse,
  isRequestLoading,
}) {
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

  function handleNameChange(e) {
    formAndValidation.handleNameChange(e);
    resetResponse();
  }

  function handleEmailChange(e) {
    formAndValidation.handleEmailChange(e);
    resetResponse();
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(
      formAndValidation.values.name,
      formAndValidation.values.email,
      formAndValidation.values.password
    );
    formAndValidation.resetForm();
  }

  return (
    <main className="register">
      <AuthHeader title="Добро пожаловать!" />
      <form
        className="register__form"
        method="post"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormField
          fieldName="Имя"
          fieldType="text"
          placeholder="Введите ваше имя"
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          name="name"
          value={formAndValidation.values.name || ''}
          errorText={formAndValidation.errors.name}
          disabled={isRequestLoading}
        />
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
          placeholder="Придумайте пароль"
          onChange={handleChange}
          name="password"
          value={formAndValidation.values.password || ''}
          errorText={formAndValidation.errors.password}
          disabled={isRequestLoading}
        />
        <ResponseMessage response={response} />
        <AuthSubmit
          submitBtnText="Зарегистрироваться"
          subText="Уже зарегистрированы? "
          linkText="Войти"
          linkPath="/signin"
          isValid={formAndValidation.isValid}
        />
      </form>
    </main>
  );
}

export default Register;
