'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const topUsers = [
  {
    avatar: '/avatars/01.png',
    fallback: 'OM',
    name: 'Olivia Martin',
    division: 'IT Support',
    telephone: '0812-3456-7890',
    amount: '380',
  },
  {
    avatar: '/avatars/02.png',
    fallback: 'JL',
    name: 'Jackson Lee',
    division: 'Marketing',
    telephone: '0821-1111-2222',
    amount: '310',
  },
  {
    avatar: '/avatars/03.png',
    fallback: 'IN',
    name: 'Isabella Nguyen',
    division: 'Procurement',
    telephone: '0856-1234-5678',
    amount: '270',
  },
  {
    avatar: '/avatars/04.png',
    fallback: 'WK',
    name: 'William Kim',
    division: 'Finance',
    telephone: '0877-9999-8888',
    amount: '220',
  },
  {
    avatar: '/avatars/05.png',
    fallback: 'SD',
    name: 'Sofia Davis',
    division: 'Operator',
    telephone: '0899-1234-4321',
    amount: '190',
  },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {topUsers.map((user, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">
              {user.division} — {user.telephone}
            </p>
          </div>
          <div className="ml-auto font-medium">{user.amount}</div>
        </div>
      ))}
    </div>
  )
}
