import React from 'react'

const Filter = ({handleFilteredChange}) => {
 
  return (
    <div>
        filter shown with <input onChange={handleFilteredChange}/>
    </div>
  )
}

export default Filter