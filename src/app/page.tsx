import { NewPost } from "@/components/new-post";
import { Post } from "@/components/post";
import { PremiumCard } from "@/components/premium-card";

export default function Home() {
  return (
    <div className='flex flex-col gap-6'>
      <NewPost/>
      <div className='flex gap-6'>
        <main className='flex flex-col items-center gap-8 flex-1'>
          <Post 
            text='Vem ai, One Piece na Netflix!!!' 
            media="https://media.kasperskydaily.com/wp-content/uploads/sites/94/2023/03/17125942/sl-abstract-phishing-hook-mail-accounts-under-water-1200x600-1.jpeg"
            user={{email: '', nickname: 'Vini u`mago', profile_picture: 'https://github.com/diego3g.png', username: '@viniumago21'}}
          />
          <Post
            text='Me valorizem hoje, pois o meu destino depende do São Paulo'
            user={{email: '', nickname: 'Diegão', profile_picture: 'https://github.com/vini.png', username: '@diegobau'}}
          />
        </main>
        <div className=''>
          <PremiumCard/>
        </div>
      </div>
    </div>
  )
}