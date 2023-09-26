'use client'

import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Home, MoreCircle, Notification, People, Search, Setting, Star, User } from "react-iconly";
import { Li } from "./ui/li";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const AsideMenu = () => {
    return(
        <aside className='w-72 h-screen border-r flex flex-col justify-between'>
          <div className='p-6 flex flex-col gap-6 overflow-y-auto scrollbar-hide flex-1'>
            <Link href='/'>
                <Image src='/logo.svg' alt='Simple Social logo' width={75} height={75}/>
            </Link>
            <Separator orientation='horizontal'/>
            <Card className='overflow-hidden shrink-0 bg-card text-card-foreground'>
                <CardHeader className="p-0">
                    <img src='https://marketplace.canva.com/EAE2cQaUHVA/1/0/1600w/canva-black-minimal-motivation-quote-linkedin-banner-HoRi-2buBWk.jpg' className="aspect-quarter" alt='wec' draggable={false}/>
                </CardHeader>
                <CardContent className="flex justify-between items-start px-2 pb-2">
                    <div className="flex gap-2 items-start">
                        <Avatar className="-translate-y-1/2">
                            <AvatarImage src='https://github.com/shadcn.png'/>
                        </Avatar>
                        <div className="">
                            <span className="text-sm">Name</span>
                            <p className="text-muted-foreground text-xs leading-2 tracking-wider">@user</p>
                        </div>
                    </div>
                    <button className='mt-1 text-primary hover:scale-105'>
                        <MoreCircle/>
                    </button>
                </CardContent>
            </Card>
            <div className='relative flex items-center'>
                <Input type='text' placeholder='Pesquisar...'  className='bg-input shadow-none shrink-0'/>
                <button className='absolute right-2 text-primary'><Search/></button>
            </div>
            <nav className=''>
                <ul className='border rounded-md bg-background shadow'>
                <Li className='border-b text-primary bg-muted rounded-t-md p-0'>
                    <Link href='/' className='flex gap-6 flex-1 px-4 py-3'>
                        <Home filled/>
                        <span>Início</span>
                    </Link>
                </Li>
                <Li className='border-b p-0'>
                    <Link href='/' className='flex gap-6 flex-1 px-4 py-3'>
                        <People/>
                        <span>Seguindo</span>
                    </Link>
                </Li>
                <Li className='border-b p-0'>
                    <Link href='/' className='flex gap-6 flex-1 px-4 py-3'>
                        <Notification/>
                        <span>Notificações</span>
                    </Link>
                </Li>
                <Li className='border-b p-0'>
                    <Link href='/' className='flex gap-6 flex-1 px-4 py-3'>
                        <User/>
                        <span>Meu Perfil</span>
                    </Link>
                </Li>
                <Li className='rounded-b-md p-0'>
                    <Link href='/' className='flex gap-6 flex-1 px-4 py-3'>
                        <Star/>
                        <span>Premium</span>
                    </Link>
                </Li>
                </ul>
            </nav>
          </div>
          <div className='pt-2 bg-background'>
            <Button className="p-6 text-base w-full gap-6 justify-start rounded-none">
                <Setting filled/>
                <span>Opções</span>
            </Button>
          </div>
        </aside>
    );
}