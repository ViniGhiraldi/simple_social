import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { IPostComment } from "@/models/post-comment"

export const PostComment = ({data}: {data: IPostComment}) => {
    const date = new Date(data.createdAt);

    return (
        <>
            <CardContent className="px-4 py-2 flex gap-4">
                <Avatar>
                    <AvatarImage src={data.user.profilePicture} />
                    <AvatarFallback className="uppercase">{data.user.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium">{data.user.nickname}</p>
                            <span className="text-muted-foreground text-xs leading-2 tracking-wider">@{data.user.username}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`}</span>
                    </div>
                    <span className="line-clamp-3 text-sm">{data.comment}</span>
                </div>
            </CardContent>
        </>
    )
}