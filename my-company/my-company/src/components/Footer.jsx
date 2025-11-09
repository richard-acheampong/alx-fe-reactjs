function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#333', // ✅ Correct spelling
        color: '#fff',
        textAlign: 'center',
        padding: '15px',
        marginTop: '20px',
        position: 'fixed', // ✅ Keeps footer at bottom
        bottom: 0,
        width: '100%'
      }}
    >
      <p>&copy; 2025 My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;