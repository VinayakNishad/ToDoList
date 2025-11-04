import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} container`}>
        <Link to="/" className={styles.logo}>
          Trello-ToDo
        </Link>
        <nav>
            
            {token ? (
                <> 
                 <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/add" className={styles.navLink}>
            Add Task
          </Link>
          <button onClick={handleLogout} className={styles.navButton}>
            Logout
          </button>
                </>
            ):(
                <>
          <Link to="/login" className={styles.navLink}>
            Login
            </Link>
            <Link to="/register" className={styles.navLink}>
            Register
            </Link>
                </>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Header;