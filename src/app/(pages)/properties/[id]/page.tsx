import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton';

const page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [ property, setProperty ] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reviews, setReviews] = useState([])
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
          <Layout>
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
          </Layout>
        );
      }
  return (
    <div>page</div>
  )
}

export default page