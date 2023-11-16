import { NewPostRoot } from "./client-components/new-post-root";
import { UserAvatar } from "./server-components/user-avatar";

export const NewPost = () => {
    return (
        <NewPostRoot>
            <UserAvatar/>
        </NewPostRoot>
    );
}