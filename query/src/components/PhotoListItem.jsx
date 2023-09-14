import React from 'react'
import { useRemovePhotoMutation } from '../store'
import CircularProgress from '@mui/material/CircularProgress';
import {GoTrash} from 'react-icons/go'

const PhotoListItem = ({photo}) => {
    
    const [removePhoto,results] = useRemovePhotoMutation()

    const handleRemovePhoto = ()=> {
        removePhoto(photo)
   }
  
    return (
    <div style={{margin:'20px', cursor:'pointer',position:'relative'}} onClick={handleRemovePhoto}>
        <img src={photo.url} alt="" />
       <div className='deleteCircularDiv'>
       {results.isLoading ? (
      <CircularProgress style={{width:'20px', height:'20px' }}/>
        ):(<GoTrash/>) }
       </div>
       
    </div>
  )
}

export default PhotoListItem