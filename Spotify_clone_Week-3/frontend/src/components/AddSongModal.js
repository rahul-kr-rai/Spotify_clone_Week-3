// AddSongModal.js
import React, { useState } from 'react';
import './AddSongModal.css'; // Optional: Add your styles here

const AddSongModal = ({ onClose, onAddSong }) => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSong = {
      id: Date.now(), // Simple unique ID
      name,
      artist,
      preview_url: previewUrl,
      image_url: imageUrl,
    };
    onAddSong(newSong);
    onClose(); // Close the modal after adding
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Song</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Song Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Artist:</label>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
          </div>
          <div>
            <label>Preview URL:</label>
            <input type="url" value={previewUrl} onChange={(e) => setPreviewUrl(e.target.value)} required />
          </div>
          <div>
            <label>Image URL:</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          </div>
          <button type="submit">Add Song</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;
