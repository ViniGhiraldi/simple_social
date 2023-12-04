import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionUserCard } from "@/components/session-user-card/session-user-card";
import { getServerSession } from "next-auth";
import { IUsuario } from "@/models/usuario";

export default async function My() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="flex flex-col gap-6">
      <SessionUserCard user={session?.user as IUsuario}/>
    </div>
  )
}