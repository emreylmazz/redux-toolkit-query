import React from 'react'
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import AlbumListItem from './AlbumListItem';

const AlbumList = ({user}) => {
    const {data,isError, isFetching}= useFetchAlbumsQuery(user);
    const [addAlbum,results] = useAddAlbumMutation()
      
  const handleAlbumAdd = () => {
    addAlbum(user); 
  }
    
  let content;
  if(isFetching) {  // çekene kadarki zaman burası
    content= (
        <Skeleton variant="rectangular" sx={{width:'100%', height:'200px'}}/>
    );
  }
  else if(isError) { // hata varsa bunu yazdırıyoruz
    content = <div>Hata Var</div>;
  }
  else {
    content = data.map((album) => {  //datayı bastığımız yer map ile dönüp
        return <AlbumListItem key={album.id} album={album} />;
    });
    }

    return (
    <>
    <div>
      <div className='topArrangement'>
        <h3>{user.name}Albümü</h3>
       <Button variant='outlined' onClick={handleAlbumAdd}>
        {results.isLoading ? (
            <CircularProgress/>
        ) : <span>Albüm Ekle+</span>}
        </Button>
    </div>
    </div>
    <div></div>
    </>
  )
}

export default AlbumList