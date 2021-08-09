function ResponseError({ isActive }) {
  return (
    <span
      className={`response-error ${isActive ? 'response-error_active' : ''}`}
    >
      Что-то пошло не так...
    </span>
  );
}

export default ResponseError;
