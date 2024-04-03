import React, { useState } from 'react';
import './css/upload_image.css';

export default function UploadImage(props) {

  const [file, setFile] = useState(null);

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);

    handleChange(e);

  }

  const handleClick = (e) => {
    
    uploadFile();
    setFile(null);
  }

  const {handleChange, uploadFile, progress} = props;

  return (
    <div className='upload-image-form'>
        <label htmlFor="image-upload" className="file-upload btn">Choose File</label>
        {file === null ? "No file Selected" : <span className='selected-file'>{file.name}</span>}
        <input type="file" id='image-upload' accept='image/*' onChange={handleSelectFile} />
        <button type="button" className='btn' onClick={handleClick}>Upload</button>
        {progress ===0 ? null : <progress value={progress} max='100'></progress>}
    </div>
  )
}
