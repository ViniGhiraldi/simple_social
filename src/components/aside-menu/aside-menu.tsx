import { AsideMenuRoot } from "./client-components/aside-menu-root";
import { UserCard } from "./server-components/user-card";

export const AsideMenu = () => {
    return (
        <AsideMenuRoot>
            <UserCard/>
        </AsideMenuRoot>
    );
}