import React from 'react'

const Notificaction = ({message, errorType}) => {
    if(message === null){
        return null
    }

    if( errorType === 'successful'){
        return ( 
        <div className="successful">
            {message}
        </div> 
        )
    }

  return (
    <div className='error'>
        {message}
    </div>
  )
}

export default Notificaction