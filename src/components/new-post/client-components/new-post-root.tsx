'use client'

import { Image2, Send, Plus } from "react-iconly";
import { Card, CardHeader } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { forwardRef, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

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
    const [file, setFile] = useState<File>();

    console.log(file)

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget;

        if(!files) return;

        setFile(files[0]);
    }

    const image = useMemo(() => {
        if(!file) return;
        
        return URL.createObjectURL(file);
    }, [file])

    return (
        <Card className='overflow-hidden'>
            <CardHeader className='flex-row gap-2 p-4'>
                {children}
                <div className="flex-1 space-y-2">
                    <Textarea className='flex-1 resize-none border-none shadow-none focus-visible:ring-0 text-base leading-4' placeholder='No que você está pensando?' />
                    {image && <img src={image} alt="" className="w-72 max-h-72" />}
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
                <Button className='h-full rounded-none'><Send filled /></Button>
            </div>
        </Card>
    );
}