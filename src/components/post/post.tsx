'use client'

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IPost } from "@/models/post";
import { useSession } from "next-auth/react";
import { IPostUsersOptions } from "@/models/post-users-options";
import { createOptions } from "@/services/api/relations/post-user-options/create-options";
import { updateOptions } from "@/services/api/relations/post-user-options/update-options";
import { PostHeader } from "./components/post-header";
import { PostOptions } from "./components/post-options";
import { PostComment } from "./components/post-comment";
import { createComment } from "@/services/api/relations/post-user-comments/create-comment";
import { IPostComment } from "@/models/post-comment";
import { PostNewComment } from "./components/post-new-comment";
import { IUsuario } from "@/models/usuario";

interface PostProps{
    post: IPost;
    user: IUsuario;
}

export const Post = ({ post, user }: PostProps) => {
    const [userOptions, setUserOptions] = useState<IPostUsersOptions>();
    const [newComment, setNewComment] = useState('');
    const [userComment, setUserComment] = useState<IPostComment[]>();
    const [countComments, setCountComments] = useState(post._count?.postComments || 0);
    const [imageIndex, setImageIndex] = useState(0);
    
    const currentDate = new Date();
    const currentDateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const getCustomDate = useCallback((date: Date) => {
        const postDate = new Date(date);
        const postDateString = `${postDate.getDate()}/${postDate.getMonth() + 1}/${postDate.getFullYear()}`;
        const postTimeString = `${postDate.getHours()}:${postDate.getMinutes()}`;

        return `${postDateString === currentDateString ? 'Hoje' : postDateString} às ${postTimeString}`;
    }, [currentDateString])

    const userDefaultInteraction = useMemo(() => {
        const userInteraction = post.postUser?.filter(interaction => {
            if(interaction.userId === user.username) return interaction
        })

        if(userInteraction && userInteraction.length){
            return userInteraction[0];
        }

        return undefined;

    }, [post, user])

    const countLikes = useMemo(() => {
        const likes = post.postUser ? post.postUser.filter(interaction => interaction.liked).length : 0;

        if(userOptions?.liked){
            if(!userDefaultInteraction?.liked){
                return likes + 1
            }
        }else{
            if(userDefaultInteraction?.liked){
                return likes - 1
            }
        }

        return likes;
    }, [post, userDefaultInteraction, userOptions])

    useEffect(() => {
        if(userDefaultInteraction) setUserOptions(userDefaultInteraction)
    }, [userDefaultInteraction])

    const handleInteraction = useCallback(async (liked = false, favorited = false) => {
        let data;
        if(userOptions){
            data = await updateOptions({...userOptions, liked, favorited})
        }else{
            data = await createOptions({
                postId: post.id,
                liked,
                favorited
            })
        }

        if(data instanceof Error) {
            console.log(data.message)
        }else{
            setUserOptions(data);
        }
    }, [userOptions]) 

    const handleComment = useCallback(async () => {
        if(!newComment) return;

        const data = await createComment({
            postId: post.id,
            comment: newComment
        })

        if(data instanceof Error) {
            console.log(data.message)
        }else{
            setNewComment('');
            setUserComment(oldValues => oldValues ? [data, ...oldValues] : [data]);
            setCountComments(oldValue => oldValue + 1);
        }
    }, [newComment]) 

    return(
        <Card className='w-[32rem]'>
            <CardHeader className='p-4'>
                <PostHeader user={post.user} date={getCustomDate(post.createdAt)}/>
            </CardHeader>
            <CardContent className='pb-2 px-4'>
                <p className='line-clamp-3'>{post.title}</p>
            </CardContent>
            {post.media && post.media.length > 0 && (
                <CardContent className='p-0 relative flex flex-col items-center justify-center w-full max-h-[32rem]'>
                    <img src={post.media[imageIndex].url} alt={post.media[imageIndex].name} className='max-h-[32rem]'/>
                    {post.media.length > 1 && (
                        <div className="absolute bottom-1 flex gap-1 bg-primary/50 hover:bg-primary/70 rounded-full p-1">
                            {post.media.map((_, i) => (
                                <button key={i} data-actived={imageIndex === i} className="w-3 h-3 rounded-full data-[actived=false]:bg-secondary/50 data-[actived=false]:hover:bg-secondary/90 data-[actived=true]:bg-primary" onClick={() => setImageIndex(i)}></button>
                            ))}
                        </div>
                    )}
                </CardContent>
            )}
            
            <CardContent className='p-0'>
                <PostOptions
                    liked={userOptions?.liked} 
                    favorited={userOptions?.favorited} 
                    totalLikes={countLikes}
                    totalcomments={countComments}
                    handleOnClick={handleInteraction}
                />
            </CardContent>
            {(userComment || (post._count && post._count.postComments > 0)) && <Separator orientation='horizontal'/>}
            
            {userComment && userComment?.map((comment, i) => (
                <PostComment
                    date={getCustomDate(comment.createdAt)}
                    comment={comment.comment}
                    user={comment.user}
                    key={i}/>
            ))}
            {(post._count && post._count.postComments > 0) && post.postComments && (
                <PostComment 
                    comment={post.postComments[0].comment}
                    date={getCustomDate(post.postComments[0].createdAt)}
                    user={post.postComments[0].user}
                />
            )}

            <Separator orientation='horizontal'/>
            
            <CardFooter className='p-4'>
                <PostNewComment
                    user={{profilePicture: user?.profilePicture, username: user.username}}
                    inputValue={newComment}
                    handleOnChange={setNewComment}
                    handleOnClick={handleComment}
                />
            </CardFooter>
        </Card>
    );
}