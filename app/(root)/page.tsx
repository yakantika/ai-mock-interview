import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Slot } from "@radix-ui/react-slot"
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/interviewCard";

import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/sign-in');
  return null;
}
