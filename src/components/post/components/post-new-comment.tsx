import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IUsuario } from "@/models/usuario";
import { Send } from "react-iconly"

interface IUserForNewComment extends Pick<IUsuario, 'profilePicture' | 'username'>{}

interface IPostNewComment{
    user: IUserForNewComment;
    inputValue: string;
    handleOnChange: (value: string) => void;
    handleOnClick: () => void;
}

export const PostNewComment = ({handleOnChange, handleOnClick, inputValue, user}: IPostNewComment) => {
    return (
        <div className="flex flex-1 items-center gap-4">
            <Avatar>
                <AvatarImage src={user.profilePicture?.url} />
                <AvatarFallback className="uppercase">{user.username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <Input type='text' onKeyDown={e => e.key === 'Enter' && handleOnClick()} value={inputValue} className='rounded-full bg-input shadow-inner' placeholder='Comente algo...' onChange={e => handleOnChange(e.currentTarget.value)} />
            <Button className='p-0 hover:scale-105' variant='link' onClick={handleOnClick}><Send filled /></Button>
        </div>
    )
}