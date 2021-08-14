function ResponseError({ errorText }) {
  return (
    <span
      className={`response-error ${errorText ? 'response-error_active' : ''}`}
    >
      {errorText}
    </span>
  );
}

export default ResponseError;
