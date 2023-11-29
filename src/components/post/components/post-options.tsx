import { cn } from "@/lib/utils";
import { IPostUsersOptions } from "@/models/post-users-options";
import { forwardRef } from "react";
import { Bookmark, Chat, Heart, Send } from "react-iconly";

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

interface IPostOptions extends Pick<IPostUsersOptions, 'liked' | 'favorited'>{
    totalLikes: number;
    totalcomments: number;
    handleOnClick: (liked?: boolean, favorited?: boolean) => Promise<void>;
}

export const PostOptions = ({liked, totalLikes, favorited, totalcomments, handleOnClick}: IPostOptions) => {
    return (
        <div className="py-2 px-4 flex justify-between">
            <div className='flex gap-4'>
                <div className="flex items-center gap-1">
                    <IconButton data-liked={liked} className="data-[liked=true]:text-destructive" onClick={() => handleOnClick(!liked, favorited)}><Heart filled={liked} /></IconButton>
                    <span className="text-xs text-muted-foreground">{totalLikes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <IconButton><Chat /></IconButton>
                    <span className="text-xs text-muted-foreground">{totalcomments}</span>
                </div>
                <IconButton><Send /></IconButton>
            </div>
            <IconButton onClick={() => handleOnClick(liked, !favorited)}><Bookmark filled={favorited} /></IconButton>
        </div>
    );
}