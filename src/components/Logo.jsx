import React from 'react'

const Logo = ({width="100px", classnames=""}) => {
  return (
    <div width={width} className={`${classnames}`}><img src="/logo.svg" alt="story mingle logo" width={width}/></div>
  )
}

export default Logo