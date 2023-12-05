'use client'

import { Image2, Send, Plus } from "react-iconly";
import { Card, CardHeader } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import React, { forwardRef, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { createPost } from "@/services/api/posts/create-post";
import { useNewPostContext } from "@/contexts/new-post-context";

const Label = forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            'cursor-pointer flex items-center gap-2 text-muted-foreground hover:scale-105 transition hover:text-primary',
            className
        )}
        {...props}
    >
        {children}
    </label>
))

export const NewPostRoot = ({children}: {children?: React.ReactNode}) => {
    const [title, setTitle] = useState<string>();
    const [media, setMedia] = useState<FileList>();
    const { setNewPosts } = useNewPostContext();
    

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget;

        if(!files) return;

        setMedia(files);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formatedTitle = title?.trim();

        if(formatedTitle){
            const data = await createPost({title: formatedTitle, media});

            if(data instanceof Error) {
                console.log(data.message)
            }else{
                setTitle('');
                setMedia(undefined);
                setNewPosts(oldValue => oldValue ? [data, ...oldValue] : [data]);
            }
        }
    }

    const imagePreview = useMemo(() => {
        if(!media) return;

        const images = [];
        
        for(let i = 0; i < media.length; i++){
            const listImage = {
                url: URL.createObjectURL(media.item(i) as File),
                name: media.item(i)?.name
            }
            images.push(listImage);
        }

        return images;
    }, [media])

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <Card className='overflow-hidden'>
                <CardHeader className='flex-row gap-2 p-4'>
                    {children}
                    <div className="flex-1 overflow-hidden space-y-2">
                        <Textarea value={title} onChange={e => setTitle(e.currentTarget.value)} className='flex-1 resize-none border-none shadow-none focus-visible:ring-0 text-base leading-4' placeholder='No que você está pensando?' />
                        {imagePreview && (
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide ">
                                {imagePreview.map((image, i) => <img src={image.url} key={i} alt={image.name} className="max-w-[10rem] max-h-[10rem]" />)}
                            </div>
                        )}
                    </div>
                </CardHeader>
                <div className='flex bg-secondary justify-between'>
                    <div className='px-4 py-2 flex flex-1'>
                        <ul className='flex gap-4'>
                            <li className=''>
                                <input type="file" id="fileInput" multiple className="hidden" onChange={handleFileSelected}/>
                                <Label htmlFor="fileInput">
                                    <Image2 />
                                    <span>Mídia</span>
                                </Label>
                            </li>
                            <li className=''>
                                <Label>
                                    <Plus />
                                    <span>Link</span>
                                </Label>
                            </li>
                        </ul>
                    </div>
                    <Button className='h-full rounded-none' type="submit"><Send filled /></Button>
                </div>
            </Card>
        </form>
    );
}