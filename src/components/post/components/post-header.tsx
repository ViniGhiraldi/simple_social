import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IPostHeader{
    avatar?: string;
    nickname: string;
    username: string;
}

export const PostHeader = ({nickname, username, avatar}: IPostHeader) => {
    return (
        <>
            <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback className="uppercase">{username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col leading-4'>
                <p>{nickname}</p>
                <span className='text-muted-foreground text-xs tracking-wider'>@{username}</span>
            </div>
        </>
    );
}