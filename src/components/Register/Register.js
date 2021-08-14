import AuthHeader from '../AuthHeader/AuthHeader';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import FormField from '../FormField/FormField';
import ResponseMessage from '../ResponseMessage/ResponseMessage';
import useFormAndValidation from '../../hooks/useFormValidation';
import { useEffect } from 'react';

function Register({ handleRegister, responseMessage }) {
  const formAndValidation = useFormAndValidation();

  useEffect(() => {
    formAndValidation.setIsValid();
  }, []);

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
          onChange={formAndValidation.handleChange}
          name="name"
          value={formAndValidation.values.name || ''}
          errorText={formAndValidation.errors.name}
        />
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
          placeholder="Придумайте пароль"
          onChange={formAndValidation.handleChange}
          name="password"
          value={formAndValidation.values.password || ''}
          errorText={formAndValidation.errors.password}
        />
        <ResponseMessage responseText={responseMessage} />
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
