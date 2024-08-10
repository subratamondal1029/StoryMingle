import { useEffect, useState } from 'react'
import  dbService  from '../Appwrite/dbService'
import { useSelector } from 'react-redux'
import { Container, Loader, PostCard } from '../components'


const Home = () => {
   const userData = useSelector((state) => state.authSlice.userData)
   const [posts, setPosts] = useState([])
   const [text, setText] = useState("")
   
   useEffect(() =>{
        if (userData) {
            dbService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }else setText("Posts are not available")
            })
        }else setPosts([])
    }, [userData])


    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full h-[50vh]">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                             {userData !== null ? text ? text : <div className='w-full h-full'><Loader /></div> : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
  )
}

export default Home