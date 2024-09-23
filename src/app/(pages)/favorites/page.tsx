import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface property{
    id: string
    title: string
    description: string
    price: number
    location: string
    image: string
}
const page = () => {
    const [favorites, setFavorites] = useState<property[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
    fetchFavotite();
    }, [])

    const fetchFavotite =  async() => {
      setIsLoading(true)
      try{
      const res = await axios.get<property[]>('/api/favorites')
      setFavorites(res.data)
      }catch(error){
        toast({
          title: "data fetching issue",
          description: "data fetching has been failed"
        })
      }finally{
        setIsLoading(false)
      }
    }

    const removeFavorite = async (id: string) => {
    try{
      await axios.delete('/api/favorites/${id}')
      setFavorites(favorites.filter(fav => fav.id !== id))
      toast({
        title: 'favorite delete',
        description: "favorite has been deleted successfully"
      })
    }catch(error){
      toast({
        title: 'error while delete',
        description: "favorite has not been deleted successfully"
      })
    }
    }
  return (
    <div>page</div>
  )
}

export default page