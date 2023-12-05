'use client'

import { IPost } from "@/models/post";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Post } from "./post/post";
import { getFeed } from "@/services/api/posts/get-feed";
import { useNewPostContext } from "@/contexts/new-post-context";
import { IUsuario } from "@/models/usuario";

interface IFeed{
    onlyfriends?: boolean;
}

export const Feed = ({onlyfriends}: IFeed) => {
    const { data: session } = useSession();
    const [feed, setFeed] = useState<IPost[] | null>(null);
    const { newPosts } = useNewPostContext();

    useEffect(() => {
        if(session?.user){
            getFeed({username: session.user.username, onlyfriends})
            .then(data => {
                if(data instanceof Error){
                    console.log(data.message);
                }else{
                    setFeed(data)
                }
            })
        }
    }, [onlyfriends, session])

    useEffect(() => {
        if(newPosts){
            setFeed(oldValue => oldValue ? [...newPosts, ...oldValue] : newPosts);
        }
    }, [newPosts])

    return(
        <ul className='flex flex-col items-center gap-8'>
            {feed?.map((post, i) => (
                <li key={i}>
                    <Post
                        post={post}
                        user={session?.user as IUsuario}
                    />
                </li>
            ))}
        </ul>
    );
}