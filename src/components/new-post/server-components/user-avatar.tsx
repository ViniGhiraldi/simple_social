import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth"

export const UserAvatar = async () => {
    const session = await getServerSession(nextAuthOptions);

    return (
        <Avatar>
            <AvatarImage src={session?.user?.profilePicture} />
            <AvatarFallback className="uppercase">{session?.user?.username.substring(0, 2)}</AvatarFallback>
        </Avatar>
    )
}