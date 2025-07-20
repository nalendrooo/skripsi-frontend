'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { MENU, sidebarData } from './data/sidebar-data'
import { TeamSwitcher } from './team-switcher'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import useProfile from '../hooks/useProfile'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const profile = useProfile()
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {(MENU[profile?.role as keyof typeof MENU] || []).map((menuGroup: any) => (
          <NavGroup key={menuGroup.title} {...menuGroup} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: profile?.name,
            email: profile?.email,
            // avatar: '/avatars/shadcn.jpg',
          }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
