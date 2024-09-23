
import SignUp from '@/components/SignUp'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
      <div className='abosulte inset-0'>
        <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center  gap-16'> 
         <Link href='/' className={cn(
              buttonVariants({ variant: 'ghost' }),
              'self-start -mt-20'
            )}>
           Home
         </Link>
         <SignUp />
        </div>
      </div>
    )
  }

export default page