import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { DollarSign, Home, Loader2, MapPin, Search } from 'lucide-react'

interface propertyType{
    id: number,
    title: string,
    description: string,
    price: number
    location: string
  }
const HeroSection = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<propertyType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();

    const handleSearch = async () => {
        if(!query.trim()){
            toast({
                title: "query issue",
                description: "there is no query availabe",
                variant: 'destructive'
            })
            return
        }
        setIsLoading(true)
        try{
            const res = await axios.get<propertyType[]>(`/api/properties?search=${encodeURIComponent(query)}`)
            setResults(res.data)
            if(res.data.length === 0){
                toast({
                    title: "No data available",
                    description: "there is no data in the database"
                })
            }
        }catch(error){
            toast({
                title: "Error",
                description: "There was a problem searching for properties.",
                variant: "destructive",
              });
        }finally{
            setIsLoading(false)
        }

    }

    const handleKeyPress =  (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
  return (
    <>
     <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Find Your Dream Property</h1>
        
        <div className="flex space-x-2 mb-8">
          <Input
            type="text"
            placeholder="Search for properties..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>{property.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {results.length === 0 && query && !isLoading && (
          <p className="text-center text-gray-600">No properties found. Try a different search term.</p>
        )}
      </div>
    </>
  )
}

export default HeroSection