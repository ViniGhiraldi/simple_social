import { NewPost } from "@/components/new-post/new-post";
import { PremiumCard } from "@/components/premium-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Simple Social | Feed',
  description: 'Generated by create next app',
}

export default async function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-6'>
      <NewPost />
      <div className='flex gap-6'>
        <main className='flex-1'>
          {children}
        </main>
        <div className='h-fit'>
          <PremiumCard />
        </div>
      </div>
    </div>
  )
}