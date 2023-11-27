'use client'

import { IPost } from "@/models/post";
import { createContext, useContext, useState } from "react";

interface INewPostContext{
    newPosts: IPost[] | undefined;
    setNewPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const NewPostContext = createContext({} as INewPostContext);

export const useNewPostContext = () => {
    return useContext(NewPostContext);
}

export const NewPostProvider = ({children}: {children?: React.ReactNode}) => {
    const [newPosts, setNewPosts] = useState<IPost[]>();

    return(
        <NewPostContext.Provider value={{newPosts, setNewPosts}}>
            {children}
        </NewPostContext.Provider>
    )
}