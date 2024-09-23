import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, Heart, HomeIcon, Loader2, MapPin, Trash2 } from 'lucide-react'
import Home from '@/app/page'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
    <>
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 flex items-center">
          <Heart className="mr-4 text-red-500" /> Favorite Properties
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HomeIcon className="h-5 w-5" />
                    <span>{property.title}</span>
                  </CardTitle>
                </CardHeader>
                <img 
                  src={property.image || "/api/placeholder/400/300"} 
                  alt={property.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="mt-4">
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </span>
                    <span className="flex items-center font-semibold text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {property.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/properties/${property.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={() => removeFavorite(property.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">You haven't added any properties to your favorites yet.</p>
            <Button asChild>
              <Link href="/">
                Browse Properties
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default page