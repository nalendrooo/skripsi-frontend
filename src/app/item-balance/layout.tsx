// import { AppSidebar } from '@/components/layout/app-sidebar'
// import { Main } from '@/components/layout/main'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/feature/_global/layout/app-sidebar'
import { Main } from '@/feature/_global/layout/Main'
import { cn } from '@/lib/utils'

interface IProps {
    children: React.ReactNode
}

const SidebarLayout = ({
    children
}: IProps) => {
    return (
        <SidebarProvider >
            <AppSidebar />
            <div
                id='content'
                className={cn(
                    'ml-auto w-full max-w-full',
                    'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                    'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                    'transition-[width] duration-200 ease-linear',
                    'flex h-svh flex-col',
                    'group-data-[scroll-locked=1]/body:h-full',
                    'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
                )}
            >
                <Main>
                    {children}
                </Main>
            </div>
        </SidebarProvider>
    )
}

export default SidebarLayout