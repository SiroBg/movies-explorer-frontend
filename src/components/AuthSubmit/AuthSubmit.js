import { Link } from 'react-router-dom';

function AuthSubmit({ submitBtnText, subText, linkText, linkPath }) {
  return (
    <>
      <button className="auth-submit__button" type="submit">
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
