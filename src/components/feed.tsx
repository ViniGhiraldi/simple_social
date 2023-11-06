'use client'

import { IPost } from "@/models/post";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Post } from "./post";

export const Feed = () => {
    const { data: session } = useSession();
    const [feed, setFeed] = useState<{data: IPost[]} | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3333/feed/${session?.user?.username}`)
        .then(res => res.json())
        .then(res => setFeed(res))
        .catch(error => console.log(error));
    }, [session])

    return(
        <ul className='flex flex-col items-center gap-8'>
            {feed?.data.map((post, i) => (
                <li key={i}>
                    <Post
                        user={post.user}
                        text={post.title}
                    />
                </li>
            ))}
        </ul>
    );
}