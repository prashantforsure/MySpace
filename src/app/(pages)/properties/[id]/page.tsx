import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface reviewType {
  rating:     number
  comment: string
  userId: number
  propertyId: number
}

interface propertyType{
  id: number,
  title: string,
  description: string,
  price: number
  image: string
}
const page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState<propertyType | null>(null);
    const [startDate, setStartDate] = useState<>(null);
    const [endDate, setEndDate] = useState(null);
    const [reviews, setReviews] = useState<reviewType | null>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(id){
     axios.get('/api/properties/${id}').then((res) => {
    setProperty(res.data)
     })
     axios.get('/api/reviews?propertyId=${id}').then((res) => {
     setReviews(res.data)
     })
    }
    }, [id])

    const handleBooking = async () => {
        if (!startDate || !endDate) {
          alert('Please select both start and end dates.');
          return;
        }
        try {
          await axios.post('/api/bookings', { 
            propertyId: id, 
            startDate: format(startDate, 'yyyy-MM-dd'), 
            endDate: format(endDate, 'yyyy-MM-dd') 
          });
          alert('Booking confirmed!');
        } catch (error) {
          alert('Error making booking. Please try again.');
        }
      };

  
      if(loading){
        return (
          <>
            <div className="container mx-auto px-4 py-8">
              <Skeleton className="h-8 w-2/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <Skeleton className="h-64 w-full mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-32 w-full" />
                </div>
                <div>
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            </div>
          
          </>
        );
      }

      if(!property){
        return (
          <div>
            theres no property available
          </div>
        )
      }
  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{property.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2" />
                Pricing and Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600 mb-4">${property.price} / night</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    className="rounded-md border"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBooking} className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" /> Book Now
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2" />
                Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default page