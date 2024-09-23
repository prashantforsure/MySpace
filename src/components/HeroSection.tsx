import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import React, { useState } from 'react'

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

    const handleKeyPress =  
  return (
    <div>HeroSection</div>
  )
}

export default HeroSection