import { useState, useEffect } from 'react'
import './App.scss'
import { IAlbum } from './Interfaces'
import CoverList from './Components/CoverList';


const App = () => {
  const fetchUrl = (method:string) => `http://demo.subsonic.org/rest/${method}?u=guest&p=guest&v=1.12.0&c=myapp&f=json`
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAlbums = () => {
    setLoading(true);
    fetch(fetchUrl('getAlbumList')+'&type=recent')
      .then(resp => resp.json())
      .then(data => setAlbums(data['subsonic-response'].albumList.album))
      .finally(() => setLoading(false));
  }

  useEffect (()=>{
    getAlbums();
  }, []);

  return (
    <div>
      <CoverList loading={loading} albums={albums} fetchUrl={fetchUrl}/>
    </div>
  );
};

export default App;