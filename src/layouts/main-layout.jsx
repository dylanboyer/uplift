import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <a href='/' style={styles.link}>
            Home
          </a>
          <a href='/analytics' style={styles.link}>
            Analytics
          </a>
          <a href='/entry' style={styles.link}>
            Entry
          </a>
          <a href='/profile' style={styles.link}>
            Profile
          </a>
          <a href='/goals' style={styles.link}>
            Goals
          </a>
        </nav>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <p>&copy; 2025 Your Company</p>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#1b1b1b', // dark black
    padding: '10px 20px',
    borderBottom: '1px solid #333', // dark grey offcolor
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  link: {
    textDecoration: 'none',
    color: '#ff6f61', // soft red highlight
    fontSize: '16px',
  },
  main: {
    backgroundColor: '#2c2c2c', // dark grey offcolor
    padding: '20px',
    minHeight: '80vh',
    color: 'white', // white text
  },
  footer: {
    backgroundColor: '#1b1b1b', // dark black
    padding: '10px 20px',
    borderTop: '1px solid #333', // dark grey offcolor
    textAlign: 'center',
    color: 'white', // white text
  },
};

export default MainLayout;
