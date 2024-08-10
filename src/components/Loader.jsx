import React from 'react'
import {Logo} from "./index"

const Loader = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
        <Logo width='250' classnames='animate-bounce-slow'/>
    </div>
  )
}

export default Loader