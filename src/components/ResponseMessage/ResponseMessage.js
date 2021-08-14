function ResponseMessage({ responseText }) {
  function handleResponseMessage() {
    return responseText === 'ОК' ? 'Запрос прошёл успешно!' : responseText;
  }

  return (
    <span
      className={`response-message ${
        responseText === 'ОК'
          ? 'response-message_type_success'
          : 'response-message_active'
      }`}
    >
      {handleResponseMessage()}
    </span>
  );
}

export default ResponseMessage;
