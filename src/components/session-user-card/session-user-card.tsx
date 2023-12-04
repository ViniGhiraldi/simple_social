import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IUsuario } from "@/models/usuario";

interface ISessionUserCard {
  user: IUsuario;
}

export const SessionUserCard = async ({user}: ISessionUserCard) => {
    return(
        <Card className="overflow-hidden shrink-0 bg-card text-card-foreground">
        {user?.banner && (
          <CardHeader className="p-0">

            <img src={user?.banner.url} className="aspect-quarter" draggable={false} />
          </CardHeader>
        )}
        <CardContent data-banner={!!user?.banner} className="flex gap-6 data-[banner=false]:pt-6">
          <Avatar className="data-[banner=true]:-translate-y-1/2 h-32 w-32 shadow-lg">
            <AvatarImage src={user?.profilePicture?.url} />
            <AvatarFallback className="uppercase text-3xl">{user?.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex gap-4 items-center mb-2">
              <h1 className="text-2xl">{user?.nickname}</h1>
              <h2 className="text-muted-foreground">@{user?.username}</h2>
            </div>
            <div className="flex gap-4 mb-4">
              <span className="text-muted-foreground">{user?._count?.followerUser || 0} Seguindo</span>
              <span className="text-muted-foreground">{user?._count?.followedUser || 0} Seguidores</span>
            </div>
            <span className="line-clamp-2">{user?.description}</span>
          </div>
        </CardContent>
      </Card>
    );
}