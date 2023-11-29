import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPost } from "@/models/post";

interface IPostHeader extends Pick<IPost, 'user'>{
    date: string;
}

export const PostHeader = ({user, date}: IPostHeader) => {
    return (
        <div className="flex gap-4 items-start justify-between">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={user.profilePicture?.url} />
                    <AvatarFallback className="uppercase">{user.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col leading-4'>
                    <p>{user.nickname}</p>
                    <span className='text-muted-foreground text-xs tracking-wider'>@{user.username}</span>
                </div>
            </div>
            <span className="text-sm text-muted-foreground">{date}</span>
        </div>
    );
}