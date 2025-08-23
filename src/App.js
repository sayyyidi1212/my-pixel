import React, { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [pixelSize, setPixelSize] = useState(8);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleConvert = () => {
    alert("Pixel art conversion started! (Demo)");
  };

  return (
    <div className="pixel-app">
      <header className="header">
        <h1>PIXEL ART CONVERTER</h1>
        <p>Turn your images into retro pixel masterpieces!</p>
      </header>

      <main className="main">
        <div className="upload-card">
          <h2>Upload Your Image</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label onClick={() => fileInputRef.current.click()} className="btn-pixel">
            Choose Image
          </label>

          <div className="pixel-control">
            <label>Pixel Size: {pixelSize}px</label>
            <input
              type="range"
              min="2"
              max="32"
              value={pixelSize}
              onChange={(e) => setPixelSize(parseInt(e.target.value))}
            />
          </div>

          <button className="btn-pixel" onClick={handleConvert}>
            Convert to Pixel Art
          </button>

          {preview && (
            <div className="preview">
              <h3>Preview</h3>
              <img src={preview} alt="Preview" style={{ imageRendering: "pixelated" }} />
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        &copy; 2025 Pixel Art Converter
      </footer>
    </div>
  );
}
