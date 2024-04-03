import './Components/css/App.css';
import {useState, useEffect} from 'react';
import {imageStorage, db} from './firebaseConfig';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {doc, updateDoc, getDocs, collection, addDoc} from "firebase/firestore";

// import components
import Header from './Components/header';
import Albums from './Components/Albums';
import AlbumPage from './Components/AlbumPage';
import AlbumForm from './Components/AlbumForm';


function App() {

  const [image, setImage] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }

  useEffect(() => {
    
    getAlbums();
    
  }, []);



  const getAlbums = async () => {

    const querySnapshot = await getDocs(collection(db, 'albums'));

    const albumsArr = querySnapshot.docs.map((doc) => {
      
      return {
        id: doc.id,
       ...doc.data()
      }
    })

    setAlbums(albumsArr);

  }

  const setShowUploadImageForm = () => {
    setShowUploadImage(!showUploadImage);
  }

  const setCurrAlbum = (album) => {

    setCurrentAlbum(album);
    setShowAlbum(!showAlbum);

    if(showAlbumForm){
      setAlbumForm();
    }
    if(showUploadImage){
      setShowUploadImageForm();
    }

  }

  const resetAlbum = () => {
    setShowAlbum(!showAlbum);
    setCurrentAlbum(null);
  }

  const setAlbumForm = () => {
    setShowAlbumForm(!showAlbumForm);
  }

  const createAlbum = async (albumName) => {

    await addDoc(collection(db, 'albums'), {
      album_name: albumName,
      images: []
    });

    getAlbums();

  }

  const addImageToAlbum = async (downloadURL) => {

    setCurrentAlbum({
      id: currentAlbum.id,
      images: [...currentAlbum.images, downloadURL],
      album_name: currentAlbum.album_name
    });

    const albumRef = doc(db, 'albums', currentAlbum.id);

    await updateDoc(albumRef, {
      album_name: currentAlbum.album_name,
      images: [...currentAlbum.images, downloadURL]
    });

    getAlbums();
    setProgress(0);

  }

  const deleteImagefromAlbum = async (imageUrl) => {
    const albumRef = doc(db, 'albums', currentAlbum.id);

    const index = currentAlbum.images.indexOf(imageUrl);

    currentAlbum.images.splice(index, 1);

    setCurrentAlbum(currentAlbum);

    await updateDoc(albumRef, {
      album_name: currentAlbum.album_name,
      images: currentAlbum.images
    });

    getAlbums();

  }

  const uploadFile = () => {

    if (image){
      const imageRef = ref(imageStorage, `${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on('state_changed', (snapshot) => {
        const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        setProgress(currentProgress);
        
      }, 
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addImageToAlbum(downloadURL);
          setImage(null);
        });
      })
    }
    
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        {showAlbumForm ? <AlbumForm createAlbum={createAlbum} /> : null}
        {showAlbum ? <AlbumPage currentAlbum={currentAlbum}
        showUploadImage={showUploadImage} 
        uploadFile={uploadFile} 
        handleChange={handleChange} 
        progress={progress}
        setShowUploadImageForm={setShowUploadImageForm}
        resetAlbum={resetAlbum}
        deleteImagefromAlbum={deleteImagefromAlbum}
         /> : 
         <Albums albums={albums} 
         setCurrAlbum={setCurrAlbum} 
         setAlbumForm={setAlbumForm} 
         showAlbumForm={showAlbumForm} />}
      </div>
    </div>
  );
}

export default App;
