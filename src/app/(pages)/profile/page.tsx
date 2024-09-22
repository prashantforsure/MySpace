import { Form } from '@/components/ui/form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const page = () => {
    const { data: session } = useSession();
    const[user, setUser] = useState({ name:'', image: ''})
    const[selectedImage, setselectedImage] = useState<File | null>(null)
    const[isUploading, setisUploading] = useState(true)

    useEffect(() => {
        if (session?.user?.id) {
          axios.get(`/api/users/${session.user.id}`).then((res) => {
            setUser(res.data);
            Form.reset({ name: res.data.name });
          });
        }
      }, [session, Form]);

   return (
    <div>page</div>
  )
}

export default page