import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { LoginForm } from "./components/login-form";

export default async function Login() {
  return (
    <div className='flex flex-col min-h-screen bg-primary justify-center items-center gap-6'>
      <Image src='/white-logo.svg' alt='Simple Social logo' width={200} height={200} className=''/>
      <Card className="w-80">
        <CardHeader>
          <h1 className="text-2xl font-bold">Entrar</h1>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
      </Card>
    </div>
  )
}