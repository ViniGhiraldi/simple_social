import { AsideMenu } from "@/components/aside-menu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <AsideMenu/>
            <main className='flex flex-col flex-1 p-6 overflow-auto max-h-screen'>
                {children}
            </main>
        </div>
    )
  }
  