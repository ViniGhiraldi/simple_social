'use client'

import { Image2, Send, Plus } from "react-iconly";
import { Card, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const LiButton = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'flex items-center gap-2 text-muted-foreground hover:scale-105 transition hover:text-primary',
      className
    )}
    {...props}
  >
    {children}
  </button>
))

export const NewPost = () => {
    return(
        <Card className='overflow-hidden'>
            <CardHeader className='flex-row gap-2 p-4'>
            <Avatar>
                <AvatarImage src='https://github.com/shadcn.png'/>
            </Avatar>
            <Textarea className='resize-none border-none shadow-none focus-visible:ring-0 text-base leading-4' placeholder='No que você está pensando?'/>
            </CardHeader>
            <div className='flex bg-secondary justify-between'>
                <div className='px-4 py-2 flex flex-1'>
                    <ul className='flex gap-4'>
                        <li className=''>
                            <LiButton>
                                <Image2/>
                                <span>Mídia</span>
                            </LiButton>
                        </li>
                        <li className=''>
                            <LiButton>
                                <Plus/>
                                <span>Link</span>
                            </LiButton>
                        </li>
                    </ul>
                </div>
                <Button className='h-full rounded-none'><Send filled/></Button>
            </div>
        </Card>
    );
}