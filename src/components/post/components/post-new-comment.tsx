import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "react-iconly"

interface IPostNewComment{
    avatar?: string;
    username: string;
    inputValue: string;
    handleOnChange: (value: string) => void;
    handleOnClick: () => void;
}

export const PostNewComment = ({handleOnChange, handleOnClick, inputValue, username, avatar}: IPostNewComment) => {
    return (
        <>
            <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback className="uppercase">{username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <Input type='text' onKeyDown={e => e.key === 'Enter' && handleOnClick()} value={inputValue} className='rounded-full bg-input shadow-inner' placeholder='Comente algo...' onChange={e => handleOnChange(e.currentTarget.value)} />
            <Button className='p-0 hover:scale-105' variant='link' onClick={handleOnClick}><Send filled /></Button>
        </>
    )
}