import SectionTitle from '../SectionTitle/SectionTitle';
import myPhoto from '../../images/about-me__image.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <SectionTitle title="Студент" />
      <div className="about-me__container">
        <div className="about-me__column">
          <h3 className="about-me__name">Борис</h3>
          <p className="about-me__about">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__text">
            Я родился и живу в Санкт-Петербурге. Люблю активный и здоровый образ
            жизни, увлекаюсь пляжным волейболом. С 2017 года работаю в фирме,
            занимающейся экспертизами памятников культурного наследия.
            Фронтендом заинтересовался в конце 2019 года по совету друга. Пока
            проходил курс по веб-разработке, успел сделать пару фриланс-заказов.
            После обучения надеюсь найти работу в сфере IT.
          </p>
          <ul className="about-me__socials-list">
            <li className="about-me__socials-item">
              <a
                href="https://github.com/SiroBg"
                className="about-me__social-link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="about-me__socials-item">
              <a
                href="https://t.me/BorisGlinskiy"
                className="about-me__social-link"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li className="about-me__socials-item">
              <a
                href="https://vk.com/id474318817"
                className="about-me__social-link"
                target="_blank"
                rel="noreferrer"
              >
                VK
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Фото студента" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
