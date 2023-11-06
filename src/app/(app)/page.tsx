import { NewPost } from "@/components/new-post";
import { PremiumCard } from "@/components/premium-card";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { Feed } from "@/components/feed";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  console.log(session)

  return (
    <div className='flex flex-col gap-6'>
      <NewPost/>
      <div className='flex gap-6'>
        <main className='flex-1'>
          <Feed/>
        </main>
        <div className='h-fit'>
          <PremiumCard/>
        </div>
      </div>
    </div>
  )
}