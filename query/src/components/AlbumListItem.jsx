import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import PhotoList from './PhotoList'
import CircularProgress from '@mui/material/CircularProgress';
import {GoTrash} from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store';

const AlbumListItem = ({album}) => {
 
    const [removeAlbum,results] = useRemoveAlbumMutation()

    const handleClick = ()=> {
        removeAlbum(album)
   }

    const header = (
        <>
        <button style={{marginRight: '30px', border:'none', cursor:'pointer'}} onClick={handleClick}>
        {results.isLoading ? (
      <CircularProgress style={{width:'20px', height:'20px' }}/>
        ):(<GoTrash/>) }
        
        </button>
        {album.name}
        </>
       )
 
    return (
    <div> <div>
    <ExpandablePanel header = {header}>
<PhotoList album = {album}/>
    </ExpandablePanel>
    </div>{album.title}</div>
  )
}

export default AlbumListItem