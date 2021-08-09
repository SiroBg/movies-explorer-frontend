import FormError from '../FormError/FormError';

function FormField({ fieldName, fieldType, minLength, maxLength }) {
  return (
    <label className="form-field">
      {fieldName}
      <input
        className="form-field__input"
        type={fieldType}
        minLength={minLength}
        maxLength={maxLength}
      />
      <FormError errorText="текст ошибки валидации" />
    </label>
  );
}

export default FormField;
