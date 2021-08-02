import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <SectionTitle title="О проекте" />
      <div className="about-project__container">
        <h3 className="about-project__title">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="about-project__title">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <table className="about-project__table">
        <thead>
          <tr>
            <th className="about-project__table-heading about-project__table-heading_type_first">
              1 неделя
            </th>
            <th className="about-project__table-heading">4 недели</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="about-project__table-cell">Back-end</td>
            <td className="about-project__table-cell">Front-end</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default AboutProject;
