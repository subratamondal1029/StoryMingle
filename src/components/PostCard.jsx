import React from 'react'
import dbService from '../Appwrite/dbService'
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featureImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full flex justify-center mb-4'>
                <img src={dbService.getFilePreview(featureImage)} alt={`${title}'s name`} className='rounded-xl max-h-52'/>
                
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard