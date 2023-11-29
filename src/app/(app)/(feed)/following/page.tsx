import { Feed } from "@/components/feed";

export default async function Following() {
  return <Feed onlyfriends={true}/>
}