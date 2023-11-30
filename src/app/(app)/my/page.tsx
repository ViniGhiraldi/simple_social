import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServerSession } from "next-auth";

export default async function My() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden shrink-0 bg-card text-card-foreground">
        {session?.user?.banner && (
          <CardHeader className="p-0">
            <img src={session?.user?.banner.url} className="aspect-quarter" draggable={false} />
          </CardHeader>
        )}
        <CardContent className="flex gap-6">
          <Avatar data-banner={!!session?.user?.banner} className="data-[banner=true]:-translate-y-1/2 h-32 w-32 shadow-lg">
            <AvatarImage src={session?.user?.profilePicture?.url} />
            <AvatarFallback className="uppercase">{session?.user?.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="p-1 space-y-1">
            <h1 className="text-2xl">{session?.user?.nickname}</h1>
            <span className="text-muted-foreground">@{session?.user?.username}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}