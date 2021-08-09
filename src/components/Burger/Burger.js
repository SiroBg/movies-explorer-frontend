function Burger({ isNavOpen, toggleNav }) {
  return (
    <div
      className={
        isNavOpen ? 'burger active navigation__burger-active' : 'burger'
      }
      onClick={toggleNav}
    >
      <div className="burger__bar"></div>
    </div>
  );
}

export default Burger;
