import React from 'react';
import './css/album_page.css';


import UploadImage from './UploadImage';

export default function AlbumPage({currentAlbum, showUploadImage, uploadFile, handleChange, progress, setShowUploadImageForm, resetAlbum, deleteImagefromAlbum}) {

  const downloadFile = (imageUrl) => {
    
    const splitURL = imageUrl.split('/');
    const filename = splitURL[splitURL.length - 1].split('?')[0];

    fetch(imageUrl)
    .then(response => response.blob()) // Gets the Blob
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    
  }


  return (
    <div className='album-container'>
      {showUploadImage ? <UploadImage uploadFile={uploadFile} handleChange={handleChange} progress={progress} /> : null}
      <div className="album-header">
        <div className="back-btn" onClick={resetAlbum}>
          <img src="/images/go-back.png" alt="" />
        </div>
        {currentAlbum.images.length > 0 ? <h2>Images in the Album</h2> : <h2>No images in this album</h2>}
        <div className="image-form-btn" onClick={setShowUploadImageForm}>{showUploadImage ? "Cancel" : "Upload Image"}</div>
      </div>
      <div className="images-container">
        {currentAlbum.images.map((imageUrl, index) => (
          <div className="image-wrapper" key={index}>
            <img src="/images/delete-btn.png" alt="" className="delete-btn" onClick={() => deleteImagefromAlbum(imageUrl)} />
            <img src="/images/download-button.png" alt="" className="download-btn" onClick={() => {downloadFile(imageUrl)}} />
            <img src={imageUrl} alt='album_image' className='album-image' />
          </div>
        ))}
      </div>
    </div>
  )
}
