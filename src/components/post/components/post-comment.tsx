import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { IPostComment } from "@/models/post-comment"

interface IPostUserComment extends Pick<IPostComment, 'comment' | 'user'>{
    date: string;
};

export const PostComment = ({comment, date, user}: IPostUserComment) => {
    return (
        <div>
            <CardContent className="px-4 py-2 flex gap-4">
                <Avatar>
                    <AvatarImage src={user.profilePicture?.url} />
                    <AvatarFallback className="uppercase">{user.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium">{user.nickname}</p>
                            <span className="text-muted-foreground text-xs leading-2 tracking-wider">@{user.username}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{date}</span>
                    </div>
                    <span className="line-clamp-3 text-sm">{comment}</span>
                </div>
            </CardContent>
        </div>
    )
}