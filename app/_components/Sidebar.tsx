import styles from "../styles/Sidebar.module.css";
import Logo from "./_subcomponents/Logo";
import Navigation from "./_subcomponents/Navigation";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Navigation />
    </div>
  );
}

export default Sidebar;
