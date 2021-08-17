import { useState, useCallback } from 'react';
import emailValidator from 'email-validator';
import { NAME_REGEXP } from '../utils/constants';

export default function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setIsValid(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (!emailValidator.validate(value) && value.length > 0) {
      setErrors({
        ...errors,
        [name]: 'Введите почту в формате email@email.com',
      });
    } else {
      setErrors({ ...errors, [name]: e.target.validationMessage });
    }
    setIsValid(
      e.target.closest('form').checkValidity() && emailValidator.validate(value)
    );
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (!NAME_REGEXP.test(value) && value.length > 0) {
      setErrors({
        ...errors,
        [name]:
          'Имя должно содержать только латиницу, кириллицу, пробел или дефис.',
      });
    } else {
      setErrors({ ...errors, [name]: e.target.validationMessage });
    }
    setIsValid(
      e.target.closest('form').checkValidity() && NAME_REGEXP.test(value)
    );
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    handleEmailChange,
    handleNameChange,
    handleSearch,
    handleCheckBox,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
