import React, { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [pixelSize, setPixelSize] = useState(8);
  const [preview, setPreview] = useState(null);
  const [pixelatedPreview, setPixelatedPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef();
  const canvasRef = useRef();

  // Pixelation function
  const pixelateImage = useCallback((img, size) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Disable image smoothing for pixelated effect
    ctx.imageSmoothingEnabled = false;
    
    // Draw image at reduced size then scale back up
    const scaledWidth = Math.max(1, Math.floor(img.width / size));
    const scaledHeight = Math.max(1, Math.floor(img.height / size));
    
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, img.width, img.height);
    
    return canvas.toDataURL();
  }, []);

  // Demo login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Username atau password salah!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    
    // Create image element to get dimensions
    const img = new Image();
    img.onload = () => {
      const pixelated = pixelateImage(img, pixelSize);
      setPixelatedPreview(pixelated);
    };
    img.src = previewUrl;
  };

  // Update pixelated preview when pixel size changes
  useEffect(() => {
    if (preview) {
      setIsProcessing(true);
      const img = new Image();
      img.onload = () => {
        setTimeout(() => {
          const pixelated = pixelateImage(img, pixelSize);
          setPixelatedPreview(pixelated);
          setIsProcessing(false);
        }, 300);
      };
      img.src = preview;
    }
  }, [pixelSize, preview, pixelateImage]);

  const handleConvert = () => {
    if (pixelatedPreview) {
      const link = document.createElement('a');
      link.download = `pixel-art-${pixelSize}px.png`;
      link.href = pixelatedPreview;
      link.click();
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      processImage(imageFile);
    }
  };

  // Login Screen
if (!isLoggedIn) {
  return (
    <div className="pixel-app login-screen">
      <div className="background-animation">
        <div className="pixel-float pixel-1"></div>
        <div className="pixel-float pixel-2"></div>
        <div className="pixel-float pixel-3"></div>
        <div className="pixel-float pixel-4"></div>
        <div className="pixel-float pixel-5"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="pixel-logo">🎮</div>
          <h1>PIXEL ART LOGIN</h1>
          <p>Enter the pixel dimension</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="input-highlight"></span>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-highlight"></span>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="btn-pixel login-btn"
          >
            <span>LOGIN</span>
            <div className="btn-glow"></div>
          </button>
        </div> {/* ← Tutup login-form */}

        <div className="demo-info">
          <p>Demo: admin / 1234</p>
        </div>
      </div> {/* ← Tutup login-card */}
    </div>
  );
}

   // Main App
  return (
    <div className="pixel-app main-app">
      <div className="background-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">🎨</div>
            <div className="title-section">
              <h1>PIXEL ART CONVERTER</h1>
              <p>Transform your images into retro pixel masterpieces!</p>
            </div>
          </div>
          <button 
            className="logout-btn"
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="main">
        <div className="converter-container">
          <div className="upload-section">
            <div 
              className={`upload-card ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📸</div>
              <h2>Upload Your Image</h2>
              <p>Drag & drop or click to select</p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              
              <button 
                onClick={() => fileInputRef.current.click()} 
                className="btn-pixel upload-btn"
              >
                <span>Choose Image</span>
              </button>

              <div className="pixel-control">
                <label className="control-label">
                  Pixel Size: <span className="pixel-value">{pixelSize}px</span>
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="2"
                    max="32"
                    value={pixelSize}
                    onChange={(e) => setPixelSize(parseInt(e.target.value))}
                    className="pixel-slider"
                  />
                  <div className="slider-track"></div>
                </div>
                <div className="slider-labels">
                  <span>Sharp</span>
                  <span>Blocky</span>
                </div>
              </div>

              {pixelatedPreview && (
                <button 
                  className="btn-pixel convert-btn" 
                  onClick={handleConvert}
                  disabled={isProcessing}
                >
                  <span>{isProcessing ? 'Processing...' : 'Download Pixel Art'}</span>
                  <div className="btn-shine"></div>
                </button>
              )}
            </div>
          </div>

          <div className="preview-section">
            {preview ? (
              <div className="preview-container">
                <div className="preview-tabs">
                  <div className="tab active">Original</div>
                  <div className="tab active">Pixelated</div>
                </div>
                
                <div className="preview-grid">
                  <div className="preview-item">
                    <h3>Original</h3>
                    <div className="image-container">
                      <img src={preview} alt="Original" />
                    </div>
                  </div>
                  
                  <div className="preview-item">
                    <h3>Pixel Art</h3>
                    <div className="image-container">
                      {isProcessing ? (
                        <div className="processing">
                          <div className="spinner"></div>
                          <p>Processing...</p>
                        </div>
                      ) : (
                        <img 
                          src={pixelatedPreview} 
                          alt="Pixelated" 
                          style={{ imageRendering: "pixelated" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-preview">
                <div className="empty-icon">🖼️</div>
                <h3>No Image Selected</h3>
                <p>Upload an image to start creating pixel art</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Pixel Art Converter. Made with ❤️ for pixel lovers</p>
          <div className="footer-links">
            <span>🎮 Retro</span>
            <span>🎨 Creative</span>
            <span>✨ Modern</span>
          </div>
        </div>
      </footer>

      <canvas ref={canvasRef} style={{ display: 'none' }} />


    </div>
  );
}