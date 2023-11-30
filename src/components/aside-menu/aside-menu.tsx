import { AsideMenuRoot } from "./client-components/aside-menu-root";
import { AsideMenuUserCard } from "./server-components/aside-menu-user-card";

export const AsideMenu = () => {
    return (
        <AsideMenuRoot>
            <AsideMenuUserCard/>
        </AsideMenuRoot>
    );
}