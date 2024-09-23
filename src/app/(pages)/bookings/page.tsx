'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { format } from 'date-fns'
import { CalendarDays, Home, DollarSign, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


interface Booking {
  id: string
  property: {
    id: string
    title: string
  }
  startDate: string
  endDate: string
  totalPrice: number
}

export default function Page() {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.id) {
        try {
          setIsLoading(true)
          const res = await axios.get(`/api/bookings?userId=${session.user.id}`)
          setBookings(res.data)
        } catch (err) {
          setError('Failed to fetch bookings. Please try again later.')
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchBookings()
  }, [session])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`)
      setBookings(bookings.filter(booking => booking.id !== bookingId))
    } catch (err) {
      setError('Failed to cancel booking. Please try again later.')
    }
  }

  return (
    
      
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Your Bookings</h1>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>You don't have any bookings yet.</p>
              <Button className="mt-4" onClick={() => window.location.href = '/properties'}>
                Browse Properties
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>{booking.property.title}</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Booking ID: {booking.id}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CalendarDays className="h-5 w-5 mr-2" />
                        <span>
                          {format(new Date(booking.startDate), 'MMM d, yyyy')} - 
                          {format(new Date(booking.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Home className="h-5 w-5 mr-2" />
                        <span>{booking.property.title}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        <span>Total Price: ${booking.totalPrice.toFixed(2)}</span>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
     
  
  )
}