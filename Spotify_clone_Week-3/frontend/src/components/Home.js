import { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import "./Home.css";
import { FaPlay, FaPause, FaPlus, FaHeart, FaList } from 'react-icons/fa';

const songLibrary = [
  {
    id: 1,
    name: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE1LzE1LzE0LzIxNmIwOTI2YjRhMGI2OWE2YzIwNDdlYy5tcDMiLCJ0aXRsZSI6IlwiVHVtIEhpIEhvXCIgQWFzaGlxdWkgMiBGdWxsIFNvbmcgV2l0aCBMeXJpY3MgfCBBZGl0eWEgUm95IEthcHVyLCBTaHJhZGRoYSBLYXBvb3IgWyBlem1wMy5jYyBdLm1wMyIsImlhdCI6MTczNTMyNDUzNiwiZXhwIjoxNzM1NDEwOTM2fQ.3qVbKc6cDL0SBSsb8hdd4K8jOHXLfS_OuOjo1qC1E-k?download',
    image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2d/11/b9/2d11b994-b4fa-19eb-953d-70b472165e95/8903431566911_cover.jpg/300x300bb.webp' // Provided Image URL
  },
  {
    id: 2,
    name: 'Channa Mereya',
    artist: 'Arijit Singh',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE1LzE4LzMwLzJkZGFjNTgzYjYxMTQzNDJlZDgxZThiMy5tcDMiLCJ0aXRsZSI6IkNoYW5uYSBNZXJleWEgRnVsbCBWaWRlbyAtIEFESE18UmFuYmlyIEthcG9vciwgQW51c2hrYXxBcmlqaXQgU2luZ2h8UHJpdGFtfEthcmFuIEpvaGFyIFsgZXptcDMuY2MgXS5tcDMiLCJpYXQiOjE3MzUzMjQ5MzAsImV4cCI6MTczNTQxMTMzMH0.BjqAA4c_WwD3VAgQI1NceASNrGxFJiwKQilKZhnOpMk?download',
    image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2d/11/b9/2d11b994-b4fa-19eb-953d-70b472165e95/8903431566911_cover.jpg/300x300bb.webp' // Provided Image URL
  },
  {
    id: 3,
    name: 'Kalank',
    artist: 'Arijit Singh',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE0LzE3LzM4LzBkNzM4NzI2ODE0Y2VhMGNjYTA0NjZiOC5tcDMiLCJ0aXRsZSI6IkthbGFuayBUaXRsZSBUcmFjayAtIEx5cmljYWwgfCBBbGlhIEJoYXR0ICwgVmFydW4gRGhhd2FuIHwgQXJpaml0IFNpbmdoIHwgUHJpdGFtfCBBbWl0YWJoIFsgZXptcDMuY2MgXS5tcDMiLCJpYXQiOjE3MzUzMjUwMDIsImV4cCI6MTczNTQxMTQwMn0.nZIhRtDgbU5RTNh6piCzzbOyMFpocbuC1aOp65w_DjU?download',
    image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2d/11/b9/2d11b994-b4fa-19eb-953d-70b472165e95/8903431566911_cover.jpg/300x300bb.webp' // Provided Image URL
  },
  {
    id: 4,
    name: 'Aaj Ki Ratt',
    artist: 'Tamanna bhatia',
    preview_url: 'https://st4.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC8xMi8xNC8xMi8xNC9iMzc4NThkYmVmMzUwYmQzZWI3NzlhOTgubXAzIiwidGl0bGUiOiJBYWoga2kgcmFhdCBtYXphIGh1c24ga2EgYWFua2hvbiBzZSBsaWppeWUsIFRob2RpIEZ1cnNhdCBiaGkgbWVyaSBqYWFuLCBTdHJlZSAyLCBUYW1hbm5hIGJoYXRpYSBTb25nIFsgZXptcDMuY2MgXS5tcDMiLCJpYXQiOjE3MzUzMjQ2MDQsImV4cCI6MTczNTQxMTAwNH0.lQSb2cvxf8UVA-h99aY4aPY-AgaIkaBI5dmbXTKF48o?download',
    image_url: 'https://e2zstore.com/wp-content/uploads/2018/11/Spotify-10-USD-Gift-Card-400x577.jpg' // Provided Image URL
  },
  {
    id: 5,
    name: 'Agar Tum Saath Ho',
    artist: 'Alka Yagnik',
    preview_url: 'https://st1.ezmp3.cc/download?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlUGF0aCI6Ii4vZmlsZXMvMjAyNC83LzE2LzEwLzEzL2E3YTQwYjEzYjFhYjgyMjNmMGM2NDc2OC5tcDMiLCJ0aXRsZSI6IkFnYXIgVHVtIFNhYXRoIEhvIEZVTEwgQVVESU8gU29uZyB8IFRhbWFzaGEgfCBSYW5iaXIgS2Fwb29yLCBEZWVwaWthIFBhZHVrb25lIHwgVC1TZXJpZXMgWyBlem1wMy5jYyBdLm1wMyIsImlhdCI6MTczNTMyNTA1MCwiZXhwIjoxNzM1NDExNDUwfQ.yLge_Wgw1dGReAm364u3FKoEhh5EwXCAgEcVHHOr6fY?download',
    image_url: 'https://e2zstore.com/wp-content/uploads/2018/11/Spotify-30-USD-Gift-Card-400x577.jpg' // Provided Image URL
  },
  {
    id: 6,
    name: 'Tujh Mein Rab Dikhta Hai',
    artist: 'Shreya Ghoshal',
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    image_url: 'https://e2zstore.com/wp-content/uploads/2018/11/Spotify-60-USD-Gift-Card-400x577.jpg' // Provided Image URL
  },
  {
    id: 7,
    name: 'Tum Jo Aaye',
    artist: 'Rahat Fateh Ali Khan',
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    image_url: 'https://e2zstore.com/wp-content/uploads/2018/11/Spotify-10-USD-Gift-Card-400x577.jpg' // Provided Image URL
  },
  {
    id: 8,
    name: 'Pal Pal Dil Ke Paas',
    artist: 'Kishore Kumar',
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    image_url: 'https://e2zstore.com/wp-content/uploads/2018/11/Spotify-30-USD-Gift-Card-400x577.jpg' // Provided Image URL
  },
  
];

function Home() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
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
    if (likedSongs.includes(track.id)) {
      setLikedSongs(likedSongs.filter(id => id !== track.id));
    } else {
      setLikedSongs([...likedSongs, track.id]);
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
                <li><a href="#"><FaPlus /> Add Songs</a></li>
                <li><a href="#"><FaHeart /> Liked Songs</a></li>
                <li><a href="#"><FaList /> My Playlist</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row">
              {songLibrary.map((track, index) => (
                <div key={track.id} className="col-md-3 mb-3"> {/* Four cards in a row */}
                  <div className="card">
                    <img src={track.image_url} className="card-img-top" alt={track.name} />
                    <div className="card-body">
                      <h5 className="card-title">{track.name}</h5>
                      <p className="card-text">{track.artist}</p>
                      <div className="music-controls">
                        <button onClick={() => playSong(index)} className="btn btn-primary mt-2">
                          {currentTrackIndex === index && isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={() => toggleLikeSong(track)} className={`btn ${likedSongs.includes(track.id) ? 'btn-danger' : 'btn-outline-success'} mt-2`}>
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

            {/* Full Music Controller */}
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
