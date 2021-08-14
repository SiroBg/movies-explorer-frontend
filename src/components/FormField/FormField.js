import FormError from '../FormError/FormError';

function FormField({
  fieldName,
  fieldType,
  placeholder,
  minLength,
  maxLength,
  onChange,
  value,
  name,
  errorText,
}) {
  return (
    <label className="form-field">
      {fieldName}
      <input
        className="form-field__input"
        type={fieldType}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        required
        name={name}
        onChange={onChange}
        value={value}
        autoComplete="off"
      />
      <FormError errorText={errorText} isActive={errorText} />
    </label>
  );
}

export default FormField;
