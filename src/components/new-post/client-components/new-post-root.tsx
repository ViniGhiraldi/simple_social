'use client'

import { Image2, Send, Plus } from "react-iconly";
import { Card, CardHeader } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { forwardRef, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { createPost } from "@/services/api/posts/create-post";

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
    const [media, setMedia] = useState<File>();
    

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget;

        if(!files) return;

        setMedia(files[0]);
    }

    const handleSubmit = async () => {
        console.log(title, media)
        if(title){
            const data = await createPost({title, media});

            if(data instanceof Error) {
                console.log(data.message)
            }else{
                setTitle(undefined);
                setMedia(undefined);
            }
        }
    }

    const imagePreview = useMemo(() => {
        if(!media) return;
        
        return URL.createObjectURL(media);
    }, [media])

    return (
        <Card className='overflow-hidden'>
            <CardHeader className='flex-row gap-2 p-4'>
                {children}
                <div className="flex-1 space-y-2">
                    <Textarea value={title} onChange={e => setTitle(e.currentTarget.value)} className='flex-1 resize-none border-none shadow-none focus-visible:ring-0 text-base leading-4' placeholder='No que você está pensando?' />
                    {imagePreview && <img src={imagePreview} alt={media?.name} className="w-72 max-h-72" />}
                </div>
            </CardHeader>
            <div className='flex bg-secondary justify-between'>
                <div className='px-4 py-2 flex flex-1'>
                    <ul className='flex gap-4'>
                        <li className=''>
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileSelected}/>
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
                <Button className='h-full rounded-none' onClick={handleSubmit}><Send filled /></Button>
            </div>
        </Card>
    );
}