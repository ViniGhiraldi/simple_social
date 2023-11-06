'use client'

import { Bookmark, Heart, Send } from "react-iconly";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { IUsuarioForPost } from "@/models/post";

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
    text: string;
    media?: string;
    user: IUsuarioForPost
}

export const Post = ({ text, media, user }: PostProps) => {
    return(
        <Card className='w-[32rem]'>
            <CardHeader className='flex-row gap-4 p-4'>
                <Avatar>
                    <AvatarImage src={user.profile_picture}/>
                </Avatar>
                <div className='flex flex-col leading-4'>
                    <p>{user.nickname}</p>
                    <small className='text-muted-foreground tracking-wider'>@{user.username}</small>
                </div>
            </CardHeader>
            <CardContent className='pb-2 px-4'>
                <p className='line-clamp-3'>{text}</p>
            </CardContent>
            {media && (
                <CardContent className='p-0'>
                    <img src={media} alt={text} className='w-full max-h-[32rem]'/>
                </CardContent>
            )}
            <CardContent className='py-2 px-4 flex justify-between'>
                <div className='flex gap-4'>
                    <IconButton><Heart/></IconButton>
                    <IconButton><Send/></IconButton>
                </div>
                <IconButton><Bookmark/></IconButton>
            </CardContent>
            <Separator orientation='horizontal'/>
            <CardFooter className='p-4 pt-2 gap-4'>
                <Avatar>
                    <AvatarImage src={user.profile_picture}/>
                </Avatar>
                <Input type='text' className='rounded-full bg-input' placeholder='Comente algo...'/>
                <Button className='p-0 hover:scale-105' variant='link'><Send filled/></Button>
            </CardFooter>
        </Card>
    );
}