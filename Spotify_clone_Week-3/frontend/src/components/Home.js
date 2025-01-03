import { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import "./Home.css";
import { FaPlay, FaPause, FaPlus, FaHeart, FaList, FaArrowLeft } from 'react-icons/fa';

const initialSongLibrary = [
  // Your initial song library here
  {
    id: 1,
    name: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE1LzE1LzE0LzIxNmIwOTI2YjRhMGI2OWE2YzIwNDdlYy5tcDMiLCJ0aXRsZSI6IlwiVHVtIEhpIEhvXCIgQWFzaGlxdWkgMiBGdWxsIFNvbmcgV2l0aCBMeXJpY3MgfCBBZGl0eWEgUm95IEthcHVyLCBTaHJhZGRoYSBLYXBvb3IgWyBlem1wMy5jYyBdLm1wMyIsImlhdCI6MTczNTMyNDUzNiwiZXhwIjoxNzM1NDEwOTM2fQ.3qVbKc6cDL0SBSsb8hdd4K8jOHXLfS_OuOjo1qC1E-k?download',
    image_url: 'https://c.saavncdn.com/609/Aashiqui-2-Punjabi-2013-500x500.jpg'

  },
  {
    id: 2,
    name: 'Channa Mereya',
    artist: 'Arijit Singh',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE1LzE4LzMwLzJkZGFjNTgzYjYxMTQzNDJlZDgxZThiMy5tcDMiLCJ0aXRsZSI6IkNoYW5uYSBNZXJleWEgRnVsbCBWaWRlbyAtIEFESE18UmFuYmlyIEthcG9vciwgQW51c2hrYXxBcmlqaXQgU2luZ2h8UHJpdGFtfEthcmFuIEpvaGFyIFsgZXptcDMuY2MgXS5tcDMiLCJpYXQiOjE3MzUzMjQ5MzAsImV4cCI6MTczNTQxMTMzMH0.BjqAA4c_WwD3VAgQI1NceASNrGxFJiwKQilKZhnOpMk?download',
    image_url: 'https://i.scdn.co/image/ab67616d0000b273045f73dc8a716c781c5e1812' // Provided Image URL
  },
  {
    id: 3,
    name: 'Kalank',
    artist: 'Arijit Singh',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE0LzE3LzM4LzBkNzM4NzI2ODE0Y2VhMGNjYTA0NjZiOC5tcDMiLCJ0aXRsZSI6IkthbGFuayBUaXRsZSBUcmFjayAtIEx5cmljYWwgfCBBbGlhIEJoYXR0ICwgVmFydW4gRGhhd2FuIHwgQXJpaml0IFNpbmdoIHwgUHJpdGFtfCBBbWl0YWJoIFsgZXptcDMuY2MgXS5tcDMiLCJpYXQiOjE3MzUzMjUwMDIsImV4cCI6MTczNTQxMTQwMn0.nZIhRtDgbU5RTNh6piCzzbOyMFpocbuC1aOp65w_DjU?download',
    image_url: 'https://mainbalti.s3.ap-south-1.amazonaws.com/image_movies/4750/shiddat-poster-16.jpg' // Provided Image URL
  },
  {
    id: 4,
    name: 'Aaj Ki Ratt',
    artist: 'Tamanna bhatia',
    preview_url: 'https://st4.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC8xMi8xNC8xMi8xNC9iMzc4NThkYmVmMzUwYmQzZWI3NzlhOTgubXAzIiwidGl0bGUiOiJBYWoga2kgcmFhdCBtYXphIGh1c24ga2EgYWFua2hvbiBzZSBsaWppeWUsIFRob2RpIEZ1cnNhdCBiaGkgbWVyaSBqYWFuLCBTdHJlZSAyLCBUYW1hbm5hIGJoYXRpYSBTb25nIFsgZXptcDMuY2MgXS5tcDMiLCJpYXQiOjE3MzUzMjQ2MDQsImV4cCI6MTczNTQxMTAwNH0.lQSb2cvxf8UVA-h99aY4aPY-AgaIkaBI5dmbXTKF48o?download',
    image_url: 'https://s.saregama.tech/image/c/fw_485/e/5a/b3/aaj-ki-raat_1440_sonu_1728988106.jpg' // Provided Image URL
  },
  {
    id: 5,
    name: 'Agar Tum Saath Ho',
    artist: 'Alka Yagnik',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE2LzEwLzEzL2E3YTQwYjEzYjFhYjgyMjNmMGM2NDc2OC5tcDMiLCJ0aXRsZSI6IkFnYXIgVHVtIFNhYXRoIEhvIEZVTEwgQVVESU8gU29uZyB8IFRhbWFzaGEgfCBSYW5iaXIgS2Fwb29yLCBEZWVwaWthIFBhZHVrb25lIHwgVC1TZXJpZXMgWyBlem1wMy5jYyBdLm1wMyIsImlhdCI6MTczNTMyNTA1MCwiZXhwIjoxNzM1NDExNDUwfQ.yLge_Wgw1dGReAm364u3FKoEhh5EwXCAgEcVHHOr6fY?download',
    image_url: 'https://i.scdn.co/image/ab67616d0000b273da50894e074ecd5ce61de0a1' // Provided Image URL
  },
  {
    id: 6,
    name: 'Tujh Mein Rab Dikhta..',
    artist: 'Shreya Ghoshal',
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpSMJmuBdwjWNG3tjf-YaKr2tiKonOjnuJpBG6OLQVYUlBFZkE3_fTNJclKFkPD2xjfw&usqp=CAU' // Provided Image URL
  },
  {
    id: 7,
    name: 'Tum Jo Aaye',
    artist: 'Rahat Fateh Ali Khan',
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    image_url: 'https://i.scdn.co/image/ab67616d00001e02a78498df98c12fb0e06bdac0' // Provided Image URL
  },
  {
    id: 8,
    name: 'Pal Pal Dil Ke Paas',
    artist: 'Kishore Kumar',
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    image_url: 'https://m.media-amazon.com/images/M/MV5BMDc5Yjk5MTQtZDYyYS00ZjBhLWI0ZDItMTVlNjNkNDk2ODhmXkEyXkFqcGc@._V1_.jpg' // Provided Image URL
  },
];

function Home() {
  const [songLibrary, setSongLibrary] = useState(initialSongLibrary);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [showLikedSongs, setShowLikedSongs] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [newSong, setNewSong] = useState({
    name: '',
    artist: '',
    album: '',
    image_url: '',
    preview_url: ''
  });
  const audioRef = useRef(new Audio());

  const playSong = (index) => {
    if (currentTrackIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = songLibrary[index].preview_url;
      audioRef.current.play();
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const toggleLikeSong = (track) => {
    if (likedSongs.some(song => song.id === track.id)) {
      setLikedSongs(likedSongs.filter(song => song.id !== track.id));
    } else {
      setLikedSongs([...likedSongs, track]);
    }
  };

  const addToPlaylist = (track) => {
    if (!playlist.some(item => item.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const handleNextSong = () => {
    if (currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % songLibrary.length;
    playSong(nextIndex);
  };

  const handlePreviousSong = () => {
    if (currentTrackIndex === null) return;
    const prevIndex = (currentTrackIndex - 1 + songLibrary.length) % songLibrary.length;
    playSong(prevIndex);
  };

  const handleAddSongFormSubmit = (e) => {
    e.preventDefault();
    const newSongWithId = { ...newSong, id: songLibrary.length + 1 };
    setSongLibrary([...songLibrary, newSongWithId]);
    setNewSong({
      name: '',
      artist: '',
      album: '',
      image_url: '',
      preview_url: ''
    });
    setShowAddSongForm(false);
  };

  const handleDeleteSong = (id) => {
    setSongLibrary(songLibrary.filter(song => song.id !== id));
    setLikedSongs(likedSongs.filter(song => song.id !== id));
    setPlaylist(playlist.filter(song => song.id !== id));
  };

  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <h4>Menu</h4>
              <ul>
                <li><a href="#" onClick={() => setShowAddSongForm(true)}><FaPlus /> Add Songs</a></li>
                <li><a href="#" onClick={() => { setShowLikedSongs(true); setShowPlaylist(false); }}><FaHeart /> Liked Songs</a></li>
                <li><a href="#" onClick={() => { setShowPlaylist(true); setShowLikedSongs(false); }}><FaList /> My Playlist</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            {showAddSongForm ? (
              <div className="add-song-form">
                <button className="btn btn-light mb-2" onClick={() => setShowAddSongForm(false)}>
                  <FaArrowLeft /> Back
                </button>
                <form onSubmit={handleAddSongFormSubmit}>
                  <div className="form-group">
                    <label>Song Name</label>
                    <input type="text" className="form-control" value={newSong.name} onChange={(e) => setNewSong({ ...newSong, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Album Name</label>
                    <input type="text" className="form-control" value={newSong.album} onChange={(e) => setNewSong({ ...newSong, album: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Artist</label>
                    <input type="text" className="form-control" value={newSong.artist} onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Album Image URL</label>
                    <input type="text" className="form-control" value={newSong.image_url} onChange={(e) => setNewSong({ ...newSong, image_url: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Song Preview URL</label>
                    <input type="text" className="form-control" value={newSong.preview_url} onChange={(e) => setNewSong({ ...newSong, preview_url: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">Add Song</button>
                </form>
              </div>
            ) : showLikedSongs ? (
              <div className="row">
                <button className="btn btn-light mb-2" onClick={() => setShowLikedSongs(false)}>
                  <FaArrowLeft /> Back
                </button>
                {likedSongs.map((track) => (
                  <div key={track.id} className="col-md-3 mb-3"> 
                    <div className="card">
                      <img src={track.image_url} className="card-img-top" alt={track.name} />
                      <div className="card-body">
                        <h5 className="card-title">{track.name}</h5>
                        <p className="card-text">{track.artist}</p>
                        <button onClick={() => toggleLikeSong(track)} className="btn btn-danger mt-2">
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : showPlaylist ? (
              <div className="row">
                <button className="btn btn-light mb-2" onClick={() => setShowPlaylist(false)}>
                  <FaArrowLeft /> Back
                </button>
                {playlist.map((track) => (
                  <div key={track.id} className="col-md-3 mb-3"> 
                    <div className="card">
                      <img src={track.image_url} className="card-img-top" alt={track.name} />
                      <div className="card-body">
                        <h5 className="card-title">{track.name}</h5>
                        <p className="card-text">{track.artist}</p>
                        <button onClick={() => handleDeleteSong(track.id)} className="btn btn-danger mt-2">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                {songLibrary.map((track, index) => (
                  <div key={track.id} className="col-md-3 mb-3"> 
                    <div className="card">
                      <img src={track.image_url} className="card-img-top" alt={track.name} />
                      <div className="card-body">
                        <h5 className="card-title">{track.name}</h5>
                        <p className="card-text">{track.artist}</p>
                        <div className="music-controls">
                          <button onClick={() => playSong(index)} className="btn btn-primary mt-2">
                            {currentTrackIndex === index && isPlaying ? <FaPause /> : <FaPlay />}
                          </button>
                          <button onClick={() => toggleLikeSong(track)} className={`btn ${likedSongs.some(song => song.id === track.id) ? 'btn-danger' : 'btn-outline-success'} mt-2`}>
                            <FaHeart />
                          </button>
                          <button onClick={() => addToPlaylist(track)} className="btn btn-outline-info mt-2">
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentTrackIndex !== null && (
              <div className="music-controller">
                <h4>Now Playing: {songLibrary[currentTrackIndex].name} by {songLibrary[currentTrackIndex].artist}</h4>
                <audio ref={audioRef} src={songLibrary[currentTrackIndex].preview_url} controls />
                <div className="controller-buttons">
                  <button onClick={handlePreviousSong} className="btn btn-secondary mt-2">Previous</button>
                  {isPlaying ? (
                    <button onClick={() => { audioRef.current.pause(); setIsPlaying(false); }} className="btn btn-danger mt-2">Pause</button>
                  ) : (
                    <button onClick={() => { audioRef.current.play(); setIsPlaying(true); }} className="btn btn-success mt-2">Play</button>
                  )}
                  <button onClick={handleNextSong} className="btn btn-secondary mt-2">Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
