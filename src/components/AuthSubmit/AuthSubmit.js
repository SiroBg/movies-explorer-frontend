import { Link } from 'react-router-dom';

function AuthSubmit({ submitBtnText, subText, linkText, linkPath, isValid }) {
  return (
    <>
      <button
        className={`auth-submit__button ${
          isValid ? '' : 'auth-submit__button_disabled'
        }`}
        type="submit"
        disabled={!isValid}
      >
        {submitBtnText}
      </button>
      <p className="auth-submit__text">
        {subText}
        <Link className="auth-submit__link" to={linkPath}>
          {linkText}
        </Link>
      </p>
    </>
  );
}

export default AuthSubmit;
