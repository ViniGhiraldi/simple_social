import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function Login() {
  return (
    <div className='flex flex-col min-h-screen bg-primary justify-center items-center gap-6'>
      <Image src='/white-logo.svg' alt='Simple Social logo' width={200} height={200} className=''/>
      <Card>
        <CardHeader>Entrar</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    </div>
  )
}