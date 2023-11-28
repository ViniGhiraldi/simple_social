import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { IPostComment } from "@/models/post-comment"

export const PostComment = ({data}: {data: IPostComment}) => {
    const postDate = new Date(data.createdAt);
    const postDateString = `${postDate.getDate()}/${postDate.getMonth() + 1}/${postDate.getFullYear()}`;
    const postTimeString = `${postDate.getHours()}:${postDate.getMinutes()}`;
    
    const realTimeDate = new Date();
    const nowDateString = `${realTimeDate.getDate()}/${realTimeDate.getMonth() + 1}/${realTimeDate.getFullYear()}`;

    return (
        <>
            <CardContent className="px-4 py-2 flex gap-4">
                <Avatar>
                    <AvatarImage src={data.user.profilePicture?.url} />
                    <AvatarFallback className="uppercase">{data.user.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium">{data.user.nickname}</p>
                            <span className="text-muted-foreground text-xs leading-2 tracking-wider">@{data.user.username}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{`${postDateString === nowDateString ? 'Hoje' : postDateString} às ${postTimeString}`}</span>
                    </div>
                    <span className="line-clamp-3 text-sm">{data.comment}</span>
                </div>
            </CardContent>
        </>
    )
}