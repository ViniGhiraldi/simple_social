import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getServerSession } from "next-auth"

export const AsideMenuUserCard = async () => {
    const session = await getServerSession(nextAuthOptions);

    return (
        <Card className='overflow-hidden shrink-0 bg-card text-card-foreground'>
            {session?.user?.banner && (
                <CardHeader className="p-0">
                    <img src={session?.user?.banner.url} className="aspect-quarter" draggable={false} />
                </CardHeader>
            )}
            <CardContent data-banner={!!session?.user?.banner} className="flex justify-between items-start gap-2 px-2 py-2 data-[banner=true]:pt-0">
                <div className="flex gap-2 items-start">
                    <Avatar data-banner={!!session?.user?.banner} className="data-[banner=true]:-translate-y-1/2">
                        <AvatarImage src={session?.user?.profilePicture?.url} />
                        <AvatarFallback className="uppercase">{session?.user?.username.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <span className="text-sm line-clamp-1">{session?.user?.nickname}</span>
                        <p className="text-muted-foreground text-xs leading-2 tracking-wider w-32 overflow-hidden py-1 text-ellipsis">@{session?.user?.username}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}