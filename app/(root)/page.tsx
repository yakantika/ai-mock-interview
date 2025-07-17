import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Slot } from "@radix-ui/react-slot"
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/interviewCard";


const page = () => {
  return (
    <>
    <section className="card-cta">
  <div className="flex flex-row items-center gap-8 max-sm:flex-col max-w-3xl mx-auto">
    <div className='flex flex-col gap-6 max-w-lg flex-1'>
      <h2 className="text-3xl font-bold">Get Interview ready with AI powered practice & feedback</h2>
      <p className ="text-lg"> Practice on real interview questions & get instant feedback</p>
      <Button asChild className="btn-primary max-sm:w-full">
        <Link href="/interview">Start an Interview</Link>
      </Button>
    </div>
    <div className="flex-1 flex justify-center">
      <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden"/>
    </div>
  </div>
</section>
<section className="flex flex-col gap-6 mt-8">
  <h2 className="text-3xl font-bold pl-4">Your Interview</h2>
  <div className="interview-section flex flex-wrap gap-6 pl-4">
    {dummyInterviews.map((interview) => (
      <InterviewCard key={interview.id} {...interview} />
    ))}
  </div>
</section>
<section className='flex flex-col gap-6 mt-8'>
  <h2 className="text-3xl font-bold pl-4">Take and Interview</h2>
  <div className='interviews-section flex flex-wrap gap-6 pl-4'>
     {dummyInterviews.map((interview) => (
      <InterviewCard key={interview.id} {...interview} />
    ))}
  </div>
</section>
    </>
  )
}

export default page
