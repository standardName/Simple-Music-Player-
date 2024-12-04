import styles from "../../styles/Header.module.css";
import { GrFavorite } from "react-icons/gr";
import Link from "next/link";
async function UserControl() {
  return (
    <div className={styles["user-control"]}>
      <div className={styles.btns}>
        <Link href="/favorite">
          <button>
            <GrFavorite />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserControl;
