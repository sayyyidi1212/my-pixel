import { useState } from "react";
import "./App.css"; // tetap pakai css bawaan atau ganti dengan style.css kamu

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMenu = () => {
    alert("Hamburger menu diklik (implementasi bisa ditambah)");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowLogin(false);
    setShowProfile(true);
  };

  return (
    <div className="App">
      {/* Background */}
      <div className="pixel-bg" id="pixelBg"></div>

      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="logo">MY PIXEL</div>
          <ul className="nav-links">
            <li><a href="#home">Beranda</a></li>
            <li><a href="#gallery">Karya</a></li>
            <li><a href="#upload">Upload</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
          </ul>

          {/* User Profile */}
          {showProfile && (
            <div className="user-profile">
              <img src="avatar.png" alt="Avatar" className="avatar" />
              <span>User</span>
              <div className="profile-dropdown">
                <a href="#settings">Settings ⚙️</a>
                <a href="#logout" onClick={() => setShowProfile(false)}>
                  Logout 🔓
                </a>
              </div>
            </div>
          )}

          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>MY PIXEL</h1>
          <p>Masuki dunia digital art yang menakjubkan dengan teknologi pixel terdepan.</p>
          <a className="cta-button" onClick={() => setShowLogin(true)}>Go Create</a>
        </div>
      </section>

      {/* Modal Login */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>&times;</span>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label>Email:</label><br />
              <input type="email" required /><br /><br />
              <label>Password:</label><br />
              <input type="password" required /><br /><br />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Pixel Form */}
      <section id="pixelForm">
        <h2>Buat Pixel Art</h2>
        <p>Upload gambar Anda untuk diubah menjadi pixel art.</p>
        <input type="file" accept="image/*" />
        <button>Convert to Pixel</button>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <h2 className="section-title">Fitur Unggulan</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Pixel Art Studio</h3>
            <p>Tools lengkap untuk membuat pixel art dengan berbagai efek dan animasi yang menakjubkan.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Rendering</h3>
            <p>Teknologi rendering real-time yang memungkinkan preview instant dari setiap perubahan yang dibuat.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌈</div>
            <h3>Color Palette</h3>
            <p>Ribuan kombinasi warna dan gradient yang dapat disesuaikan untuk hasil karya yang spektakuler.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💫</div>
            <h3>Animation Engine</h3>
            <p>Sistem animasi canggih untuk memberikan kehidupan pada setiap pixel dalam karya Anda.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Export Options</h3>
            <p>Berbagai format export termasuk GIF, PNG, SVG, dan format khusus untuk game development.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Community</h3>
            <p>Bergabung dengan komunitas seniman digital dan bagikan karya Anda dengan dunia.</p>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section id="leaderboard">
        <h2>🏆 Leaderboard</h2>
        <ul id="leaderboardList"></ul>
      </section>

      {/* Upload Form */}
      <section className="upload-section">
        <h2>Upload Karya Anda</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nama Anda" required />
          <input type="file" accept="image/*" required />
          <button type="button">Upload</button>
        </form>
      </section>

      {/* Gallery */}
      <section className="gallery" id="gallery">
        <h2 className="section-title">Galeri Karya</h2>
        <div className="gallery-grid" id="galleryGrid">
          {/* hasil karya akan muncul di sini */}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-content">
          <div className="social-links">
            <a href="#">📱</a>
            <a href="#">💻</a>
            <a href="#">🎮</a>
            <a href="#">🌐</a>
          </div>
          <p className="footer-text">
            © 2025 PIXEL VERSE. Dibuat dengan ❤️ untuk para seniman digital.
          </p>
          <canvas id="pixelFooterCanvas" width="800" height="200"></canvas>
        </div>
      </footer>
    </div>
  );
}

export default App;
