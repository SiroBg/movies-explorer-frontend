import { useEffect } from 'react';
import { CLOSE_KEY } from '../../utils/constants';

function InfoToolTip({ isOpen, onClose }) {
  function closePopup(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    function closePopupOnEscape(e) {
      if (e.key === CLOSE_KEY) {
        onClose();
      }
    }

    isOpen && window.addEventListener('keydown', closePopupOnEscape);

    return () => {
      window.removeEventListener('keydown', closePopupOnEscape);
    };
  }, [isOpen]);

  return (
    <article
      className={`info-tool-tip ${isOpen ? `info-tool-tip_opened` : ``}`}
      onClick={closePopup}
    >
      <div className="info-tool-tip__content">
        <h2 className="info-tool-tip__title">Запрос прошёл успешно!</h2>
        <button
          className="info-tool-tip__btn"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </article>
  );
}

export default InfoToolTip;
