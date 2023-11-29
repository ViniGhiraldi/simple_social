import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { LoginForm } from "./components/login-form";

export default async function Login() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-primary flex items-center justify-center">
        <Image src='/white-logo.svg' alt='Simple Social logo' width={250} height={250} className=''/>
      </div>
      <div className="flex-1 bg-secondary flex items-center justify-center">
        <div className="w-1/2 space-y-6 rounded-xl border-2 p-6">
          <h1 className="text-4xl">Entrar</h1>
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}