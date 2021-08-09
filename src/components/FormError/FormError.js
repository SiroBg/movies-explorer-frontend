function FormError({ errorText, isActive }) {
  return (
    <span className={`form-error ${isActive ? 'form-error_active' : ''}`}>
      {errorText}
    </span>
  );
}

export default FormError;
