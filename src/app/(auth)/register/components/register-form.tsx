'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/services/api/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import * as z from 'zod';

const formSchema = z.object({
    username: z.string().min(5).max(20).toLowerCase().trim(),
    nickname: z.string().min(3).max(30).trim(),
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(6).trim()
})

export const RegisterForm = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.user){
            setCookie(undefined, 'simplesocial.accessToken', session.user.accessToken, {
                maxAge: 60 * 60 * 1, // 1 hour
                path: '/'
            })

            setCookie(undefined, 'simplesocial.refreshToken', session.user.refreshToken, {
                maxAge: 60 * 60 * 48, // 48 hours
                path: '/'
            })

            router.replace('/')
        }
    }, [session])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            nickname: '',
            email: '',
            password: ''
        }
    })

    const handleSubmit = async ({username, nickname, email, password}: z.infer<typeof formSchema>) => {
        const result = await signUp({
            username,
            nickname,
            email,
            password
        })

        if(result instanceof Error){
            console.log(result)
        }else{
            const login = await signIn('credentials', {
                uniquekey: username,
                password: password,
                redirect: false
            })
    
            if(login?.error){
                console.log('Erro no Login: ', result);
                return;
            }
        }
    }

    return(
        <Form {...form}>
            <form encType="multipart/form-data" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nome de Usuário</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-input"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nickname"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Apelido</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-input"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-input"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-input"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between">
                    <Button type="submit" className="text-base">Cadastrar</Button>
                    <Link href='/login' className="text-sm text-primary underline">Já possui uma conta?</Link>
                </div>
            </form>
        </Form>
    )
}