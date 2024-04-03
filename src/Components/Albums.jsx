import React from 'react';
import './css/Albums.css';

export default function Albums({albums, setCurrAlbum, setAlbumForm, showAlbumForm}) {
  return (
    <>
    <div className="heading-form-container">
      <h1 className="heading">All Albums</h1>
      <div className="btn" onClick={setAlbumForm}>{showAlbumForm ? "Cancel" : "Create Album"}</div>
    </div>
    <div className="albums-container">
      {albums.map((album, index) => (
        <div className="album-card" key={index} onClick={() => setCurrAlbum(album)}>
          <img src={album.images.length === 0 ? "/images/image_placeholder.jpg" : album.images[0] } alt="Album_Image" className='album-image' />
          <p className="album-title">{album.album_name}</p>
        </div>
      ))}
    </div>
    </>
  )
}
