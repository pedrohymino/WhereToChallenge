import { useState, useRef, useEffect } from 'react'
import { ICoverList, IAlbumInfo } from '../Interfaces';
import Loading from './Loading';
import Coverflow from "reactjs-coverflow";
import play from '../play.png';

const CoverList = (props: ICoverList) => {
  const {loading, albums, fetchUrl} = props;
  const [albumSelected, setAlbumSelected] = useState<number>(0);
  const [albumInfo, setAlbumInfo] = useState<IAlbumInfo>({} as any);
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
  const coverflow:any = useRef(null);

  const handlePrev = () => coverflow.current.previous();
  const handleNext = () => coverflow.current.next();

  const onChange = (position:number) => {
    setAlbumSelected(position);
    getAlbumInfo(position);
  }

  const getAlbumInfo = (selected:number) => {
    setLoadingInfo(true);
    fetch(fetchUrl('getMusicDirectory')+`&id=${albums[selected].id}`)
    .then(resp => resp.json())
    .then(data => setAlbumInfo(data['subsonic-response'].directory))
    .finally(()=> setLoadingInfo(false));
  }

  useEffect(() => {
    if (albums?.length) {
      onChange(albumSelected)
    }
  },[albums]);

  const renderAlbumInfo = () => {
    const {child, name} = albumInfo;

    return (
    <div className='album_info'>
      {loadingInfo && <Loading/>}
      {!loadingInfo && <>
        <h2>{name}</h2>
        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>Track</th>
            </tr>
          </thead>
          <tbody>
            {child && child.length && child.map((song,index) =>
              <tr key={song.id}>
                <td>{song.track ? song.track : index+1}</td>
                <td>{song.title}</td>
              </tr>
            )}
          </tbody>
        </table>
      </>}
    </div>);
  }

  return (
    <div>
      <div className='cover'>
        {loading && <Loading/>}
        {!loading && <>
          <div className='btn btn_prev' onClick={handlePrev}>
            <img src={play} alt="prev"/>
          </div>
          <Coverflow
            ref={coverflow}
            className="cover_list"
            startPosition={0}
            enableScroll={true}
            animationSpeed={0.6}
            onChange={(position:number) => onChange(position)}
          > 
            {albums.map((alb,index) => {
              const {id, album} = alb
              return <img 
                key={id}
                src={fetchUrl('getCoverArt')+`&id=${id}`}
                className={`cover_img ${index === albumSelected ? 'selected' : ''}`}
                onClick={()=>setAlbumSelected(index)}
                alt={`Cover album ${album}`}
              />
            })}
          </Coverflow>
          <div className='btn btn_next' onClick={handleNext}>
            <img src={play} alt="next"/>
          </div>
        </>}
      </div>
      {!loading && renderAlbumInfo()}
    </div>
  )
}

export default CoverList;