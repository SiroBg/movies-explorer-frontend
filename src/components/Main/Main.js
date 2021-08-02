import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <AboutProject />
      </main>
    </>
  );
}

export default Main;
