'use client'

import { Bookmark, Heart, Send, Chat } from "react-iconly";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IPost } from "@/models/post";
import { useSession } from "next-auth/react";
import { IPostUsersOptions } from "@/models/post-users-options";
import { createOptions } from "@/services/api/relations/post-user-options/create-options";
import { updateOptions } from "@/services/api/relations/post-user-options/update-options";

const IconButton = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'hover:scale-105 hover:text-muted-foreground transition',
      className
    )}
    {...props}
  >
    {children}
  </button>
))

interface PostProps{
    post: IPost
}

export const Post = ({ post }: PostProps) => {
    const { data: session } = useSession();

    const [userOptions, setUserOptions] = useState<IPostUsersOptions>();

    const countLikes = useCallback(() => {
        const likes = post.postUser.filter(interaction => interaction.liked)

        return likes.length
    }, [post])

    useEffect(() => {
        const userInteraction = post.postUser.filter(interaction => {
            if(interaction.userId === session?.user?.username) return interaction
        })

        if(userInteraction.length) setUserOptions(userInteraction[0])
    }, [post, session])

    const handleInteraction = async (liked = false, favorited = false) => {
        let data;
        if(userOptions){
            data = await updateOptions({...userOptions, liked, favorited})
        }else{
            data = await createOptions({
                postId: post.id,
                liked,
                favorited
            })
        }

        if(data instanceof Error) {
            console.log(data.message)
        }else{
            setUserOptions(data);
        }
    }

    return(
        <Card className='w-[32rem]'>
            <CardHeader className='flex-row gap-4 p-4'>
                <Avatar>
                    <AvatarImage src={post.user.profilePicture}/>
                    <AvatarFallback className="uppercase">{post.user.username.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col leading-4'>
                    <p>{post.user.nickname}</p>
                    <small className='text-muted-foreground tracking-wider'>@{post.user.username}</small>
                </div>
            </CardHeader>
            <CardContent className='pb-2 px-4'>
                <p className='line-clamp-3'>{post.title}</p>
            </CardContent>
            {post.media && (
                <CardContent className='p-0'>
                    <img src={post.media} alt={post.title} className='w-full max-h-[32rem]'/>
                </CardContent>
            )}
            <CardContent className='py-2 px-4 flex justify-between'>
                <div className='flex gap-4'>
                    <div className="flex items-center gap-1">
                        <IconButton data-liked={userOptions?.liked} className="data-[liked=true]:text-destructive" onClick={() => handleInteraction(!userOptions?.liked, userOptions?.favorited)}><Heart filled={userOptions?.liked}/></IconButton>
                        <span className="text-xs text-muted-foreground">{countLikes()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconButton><Chat/></IconButton>
                        <span className="text-xs text-muted-foreground">{post._count.postComments}</span>
                    </div>
                    <IconButton><Send/></IconButton>
                </div>
                <IconButton onClick={() => handleInteraction(userOptions?.liked, !userOptions?.favorited)}><Bookmark filled={userOptions?.favorited}/></IconButton>
            </CardContent>
            <Separator orientation='horizontal'/>
            <CardFooter className='p-4 pt-2 gap-4'>
                <Avatar>
                    <AvatarImage src={session?.user?.profilePicture}/>
                    <AvatarFallback className="uppercase">{session?.user?.username.substring(0,2)}</AvatarFallback>
                </Avatar>
                <Input type='text' className='rounded-full bg-input shadow-inner' placeholder='Comente algo...'/>
                <Button className='p-0 hover:scale-105' variant='link'><Send filled/></Button>
            </CardFooter>
        </Card>
    );
}