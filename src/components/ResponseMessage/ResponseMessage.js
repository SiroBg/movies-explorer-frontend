function ResponseMessage({ response }) {
  function handleResponseMessage() {
    if (response === 'celebrate request validation failed') {
      return 'Неверный формат почты.';
    }
    return response ? response : '';
  }

  return (
    <span
      className={`response-message ${
        response ? 'response-message_active' : ''
      }`}
    >
      {handleResponseMessage()}
    </span>
  );
}

export default ResponseMessage;
