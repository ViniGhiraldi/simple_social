'use client'

import { IPost } from "@/models/post";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { getFeed } from "@/services/api/posts/getFeed";

export const Feed = () => {
    const { data: session } = useSession();
    const [feed, setFeed] = useState<IPost[] | null>(null);

    useEffect(() => {
        if(session?.user){
            getFeed({username: session.user.username})
            .then(data => {
                if(data instanceof Error){
                    console.log(data.message);
                }else{
                    setFeed(data)
                }
            })
        }
    }, [session])

    return(
        <ul className='flex flex-col items-center gap-8'>
            {feed?.map((post, i) => (
                <li key={i}>
                    <Post
                        user={post.user}
                        text={post.title}
                        media={post.media}
                    />
                </li>
            ))}
        </ul>
    );
}