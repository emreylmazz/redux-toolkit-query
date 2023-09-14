import React from 'react'
import {GoChevronLeft,GoChevronDown} from 'react-icons/go'
import { useState } from 'react'

const ExpandablePanel = ({ header,children}) => {
  const [expanded, setExpanded] = useState(false);
  handleClick = () => {
    setExpanded(!expanded); // hep tersini yapıyo yani basınca açma kapama gibi
  };

  return (
    <div className='panelDiv'>
      <div className='topArrangement'>
        <div className='topArrangement'>{header}</div>
      </div>
      <div onClick={handleClick}>
       {expanded ? <GoChevronDown/> :<GoChevronLeft/>} 
      </div>
      
      
      
      {expanded && <div>{children}</div> }  
      </div>  // expanded doğruysa children ı bas demek oluyo
  )
}

export default ExpandablePanel