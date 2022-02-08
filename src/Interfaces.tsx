export interface IAlbum {
  album: string;
  artist: string;
  averageRating: number;
  coverArt: string;
  created: string;
  genre: string;
  id: string;
  isDir: boolean;
  parent: string;
  playCount: number;
  title: string;
  userRating: number;
}

export interface ICoverList {
  loading: boolean;
  albums: IAlbum[];
  fetchUrl: (method:string) => string;
}

export interface IAlbumInfo {
  child: ITrack[];
  id: string;
  name: string;
}

export interface ITrack {
  id: string;
  title: string;
  track: number;
}