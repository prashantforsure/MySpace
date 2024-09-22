'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
interface property{
    id: number,
    title: string,
    description: string,
    price: number
}
const page = () => {
    const [ properties, setProperties ] = useState<property[]>([])
    useEffect(() => {
   axios.get('api/properties').then((res) => setProperties(res.data)).catch((error) => console.error(error))
    }, [])
  return (
  
    <div className=''>
        this works
    </div>
  )
}

export default page