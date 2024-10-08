'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

interface property{
    id: number,
    title: string,
    description: string,
    price: number
    image: string
}
const page = () => {
    const [ properties, setProperties ] = useState<property[]>([])
    const [ loading , setLoading ] = useState(true)
    useEffect(() => {
   axios.get('api/properties')
   .then((res) => {
    setProperties(res.data)
    setLoading(false)})
    .catch((error) => console.error(error))
   
    }, [])
  return (
  
    <div className='container mx-auto px-4 py-8'>
        <h1 className='font-bold text-blue-700 text-4xl text-center mb-8'>
            Looking for property to stay
            </h1>
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {properties.map(property => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                    <Card  className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <img src={property.image || "/api/placeholder/400/300"} alt={property.title} className="w-full h-48 object-cover" />
                        <CardHeader>
                            <CardTitle className=''>
                                {property.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm text-gray-600 mb-2 flex items-center'>
                                {property.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <p className='text-sm text-green-600 mb-2 flex items-center'>
                                {property.price} / night
                            </p>
                        </CardFooter>
                    </Card>
                </Link>
                )
                )}
            </div>
        )}
    </div>
  )
}

export default page