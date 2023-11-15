'use client'

import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Home, Logout, MoreCircle, Notification, People, Search, Setting, Star, User } from "react-iconly";
import { Li } from "../ui/li";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

interface ButtonLinkProps {
    children?: React.ReactNode;
    text: string;
    href: string;
    isSelected: boolean;
}

const ButtonLink = ({ isSelected, children, text, href }: ButtonLinkProps) => {
    return (
        <Li data-isselected={isSelected} className='border-b data-[isselected=true]:text-primary data-[isselected=true]:bg-muted p-0'>
            <Link href={href} className='flex gap-6 flex-1 px-4 py-3'>
                {children}
                <span>{text}</span>
            </Link>
        </Li>
    )
}

export const AsideMenu = () => {
    const { data: session } = useSession();
    const pathname = usePathname()

    const pathCompare = useCallback((href: string) => {
        return pathname === href
    }, [pathname])

    return (
        <aside className='w-72 h-screen border-r flex flex-col justify-between'>
            <div className='p-6 flex flex-col gap-6 overflow-y-auto scrollbar-hide flex-1'>
                <Link href='/'>
                    <Image src='/logo.svg' alt='Simple Social logo' width={75} height={75} />
                </Link>
                <Separator orientation='horizontal' />
                <Card className='overflow-hidden shrink-0 bg-card text-card-foreground'>
                    {!!session?.user?.banner && (
                        <CardHeader className="p-0">
                            <img src={session?.user?.banner} className="aspect-quarter" draggable={false} />
                        </CardHeader>
                    )}
                    <CardContent data-banner={!!session?.user?.banner} className="flex justify-between items-start gap-2 px-2 py-2 data-[banner=true]:pt-0">
                        <div className="flex gap-2 items-start">
                            <Avatar data-banner={!!session?.user?.banner} className="data-[banner=true]:-translate-y-1/2">
                                <AvatarImage src={session?.user?.profilePicture} />
                                <AvatarFallback className="uppercase">{session?.user?.username.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <span className="text-sm line-clamp-1">{session?.user?.nickname}</span>
                                <p className="text-muted-foreground text-xs leading-2 tracking-wider w-32 overflow-hidden py-1 text-ellipsis">@{session?.user?.username}</p>
                            </div>
                        </div>
                        <button className='mt-1 text-primary hover:scale-105'>
                            <MoreCircle />
                        </button>
                    </CardContent>
                </Card>
                <div className='relative flex items-center'>
                    <Input type='text' placeholder='Pesquisar...' className='bg-input shadow-inner shrink-0' />
                    <button className='absolute right-2 text-primary'><Search /></button>
                </div>
                <nav className=''>
                    <ul className='border rounded-md bg-background shadow overflow-hidden'>
                        <ButtonLink href="/" text="Início" isSelected={pathCompare('/')}>
                            <Home filled={pathCompare('/')}/>
                        </ButtonLink>
                        <ButtonLink href="/following" text="Seguindo" isSelected={pathCompare('/following')}>
                            <People filled={pathCompare('/following')}/>
                        </ButtonLink>
                        <ButtonLink href="/notifications" text="Notificações" isSelected={pathCompare('/notifications')}>
                            <Notification filled={pathCompare('/notifications')}/>
                        </ButtonLink>
                        <ButtonLink href="/my" text="Meu Perfil" isSelected={pathCompare('/my')}>
                            <User filled={pathCompare('/my')}/>
                        </ButtonLink>
                        <ButtonLink href="/premium" text="Premium" isSelected={pathCompare('/premium')}>
                            <Star filled={pathCompare('/premium')}/>
                        </ButtonLink>
                    </ul>
                </nav>
            </div>
            <div className='pt-2 bg-background'>
                {/* <Button className="p-6 text-base w-full gap-6 justify-start rounded-none">
                    <Setting filled />
                    <span>Opções</span>
                </Button> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-full">
                        <Button className="w-full p-6 text-base gap-6 justify-start rounded-none">
                            <Setting filled />
                            <span>Opções</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60">
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="flex gap-6" onClick={async () => await signOut()}>
                            <Logout/>
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
}