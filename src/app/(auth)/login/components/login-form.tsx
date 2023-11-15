'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useEffect } from "react";

const formSchema = z.object({
    uniquekey: z.string(),
    password: z.string()
})

export const LoginForm = () => {
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
            uniquekey: '',
            password: ''
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)

        const result = await signIn('credentials', {
            uniquekey: values.uniquekey,
            password: values.password,
            redirect: false
        })

        if(result?.error){
            console.log(result);
            return;
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name='uniquekey'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nome de Usuário ou E-mail</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Entrar</Button>
            </form>
        </Form>
    )
}