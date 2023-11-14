import { AsideMenu } from "@/components/aside-menu";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: 'Simple Social | Main',
  description: 'Generated by create next app',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(nextAuthOptions);

  if(!session) return redirect('/login');
  
  return (
    <div className="flex">
        <AsideMenu/>
        <main className='flex flex-col flex-1 p-6 overflow-auto max-h-screen'>
            {children}
        </main>
    </div>
  )
}
