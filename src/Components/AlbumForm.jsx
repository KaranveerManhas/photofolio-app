import React, { useState } from 'react';
import './css/album_form.css';

export default function AlbumForm({createAlbum}) {

    const [albumName, setAlbumName] = useState("");


    const handleChange = (e) => {

        setAlbumName(e.target.value);

    }

    const handleSubmit = () =>{
       
        if (albumName === "" || albumName === " "){
          return;
        }

        createAlbum(albumName);
    }


  return (
    <div className="form-container">
        <h2 className="form-heading">Add a New Album</h2>
        <div className='input-btn-container'>
          <input type="text" onChange={handleChange} className='form-input' />
          <button onClick={handleSubmit} className='btn'>Create</button>
        </div>
    </div>
  )
}
