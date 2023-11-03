import { NewPost } from "@/components/new-post";
import { Post } from "@/components/post";
import { PremiumCard } from "@/components/premium-card";

export default async function Home() {
  /* const feed = await fetch('http://localhost:3333/feed') */

  return (
    <div className='flex flex-col gap-6'>
      <NewPost/>
      <div className='flex gap-6'>
        <main className='flex flex-col items-center gap-8 flex-1'>
          <Post 
            text='Partiu viajar!!!' 
            media="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
            user={{email: '', nickname: 'Vinicius | DEV', profile_picture: 'https://github.com/diego3g.png', username: '@vinighiraldi'}}
          />
          <Post
            text='Não acredite na mentira, pois não é verdade.'
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