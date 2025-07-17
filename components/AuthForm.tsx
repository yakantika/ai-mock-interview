"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Form, FormField } from "@/components/ui/form"
import { Input } from "../components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action";


type AuthFormProps = {
  type: "sign-in" | "sign-up"; // or string if you want general
};

const authFormSchema = (type : FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }: {type: FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",

    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === 'sign-up'){
        const {name, email, password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        // Set displayName in Firebase Auth
        await import('firebase/auth').then(({ updateProfile }) => updateProfile(userCredentials.user, { displayName: name }));
        const result = await signUp({
          uid: userCredentials.user.uid,
          name,
          email,
          password,
        })

        if(!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success('Account created sucessfulli. Please sign in')
        router.push('/sign-in')
        console.log('SIGN UP', values);
      }else{
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if(!idToken) {
          toast.error('Sign in failed')
          return;
        }

        // Set session cookie by calling API route
        await fetch('/api/sessionLogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        await signIn({
          email,idToken
        })
         
        toast.success('Sign in sucessfulli.')
        router.push('/')
        // console.log('SIGN IN', values);
      }
    }catch(error){
      console.log(error);
      toast.error(`There was an error: ${error instanceof Error ? error.message : error}`) 
    }
  }

  const isSignIn = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row items-center gap-4 mb-4">
  <h2 className="text-primary-100 text-2xl font-bold m-0 p-0 leading-none">PrepUp</h2>
  <img src="/logo.svg" alt="logo" height={48} width={48} className="p-4 bg-white/80 dark:bg-zinc-800/80 rounded-full align-middle ml-2" />
</div>
        <h3>Practice Job interview with AI</h3>
      
    
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
    {!isSignIn && (
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <div>
            <label className="block mb-1">Name</label>
            <Input placeholder="Your Name" {...field} />
          </div>
        )}
      />
    )}
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <div>
          <label className="block mb-1">Email</label>
          <Input placeholder="Your Email" type="email" {...field} />
        </div>
      )}
    />
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <div>
          <label className="block mb-1">Password</label>
          <Input placeholder="Your Password" type="password" {...field} />
        </div>
      )}
    />
    <Button className="w-full btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
  </form>
</Form>
  
    <p className="text-center">{isSignIn ? 'No account yet?' : 'Have an account already?'}
      <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSignIn ? "Sign in" : 'Sign up'}</Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm
