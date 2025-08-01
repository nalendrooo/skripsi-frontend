import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
// import { type SidebarData } from '../types'

export const sidebarData: any = {
  user: {
    name: 'Dinas Perhubungan Kabupaten Banyumas',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shaddcn Admsin',
      logo: 'Command',
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: 'GalleryVerticalEnd',
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: 'AudioWaveform',
      plan: 'Startup',
    },
  ],
  navGroups: [

    {
      title: 'Dashboard',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: 'IconGauge',
        }
      ]
    },
    {
      title: 'User',
      items: [
        {
          title: 'Pengambil',
          url: '/user',
          icon: 'IconUserRound',
        }
      ]
    },
    {
      title: 'Barang',
      items: [
        {
          title: 'Stok Barang',
          url: '/item',
          icon: 'IconPackages',
        },
        {
          title: 'Barang Masuk',
          url: '/item-restock',
          icon: 'IconPackagesPlus',
        },
        {
          title: 'Barang Keluar',
          url: '/item-out',
          icon: 'IconPackagesMinus',
        },
        {
          title: 'Stok Opname',
          url: '/item-balance',
          icon: 'IconPackagesCheck',
        },
      ],

    },
    {
      title: 'General',
      items: [
        {
          title: 'Kategori Barang',
          url: '/category',
          icon: 'IconLayoutDashboard',
        },

        {
          title: 'Satuan Barang',
          url: '/unit',
          icon: 'IconBoxes',
        },
      ],
    },
    {
      title: 'Users',
      items: [
        {
          title: 'Petugas',
          url: '/operator',
          icon: 'IconUserRoundCog',
        },
        {
          title: 'Divisi',
          url: '/division',
          icon: 'IconAward',
        },
      ]
    }
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign In (2 Col)',
    //           url: '/sign-in-2',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/401',
    //           icon: IconLock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/403',
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/404',
    //           icon: IconError404,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/500',
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/503',
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Other',
    //   items: [
    //     {
    //       title: 'Settings',
    //       icon: IconSettings,
    //       items: [
    //         {
    //           title: 'Profile',
    //           url: '/settings',
    //           icon: IconUserCog,
    //         },
    //         {
    //           title: 'Account',
    //           url: '/settings/account',
    //           icon: IconTool,
    //         },
    //         {
    //           title: 'Appearance',
    //           url: '/settings/appearance',
    //           icon: IconPalette,
    //         },
    //         {
    //           title: 'Notifications',
    //           url: '/settings/notifications',
    //           icon: IconNotification,
    //         },
    //         {
    //           title: 'Display',
    //           url: '/settings/display',
    //           icon: IconBrowserCheck,
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Help Center',
    //       url: '/help-center',
    //       icon: IconHelp,
    //     },
    //   ],
    // },
  ],
}

export const MENU = {
  SUPERADMIN: [

    {
      title: 'Dashboard',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: 'IconGauge',
        }
      ]
    },
    {
      title: 'User',
      items: [
        {
          title: 'Pengambil',
          url: '/user',
          icon: 'IconUserRound',
        }
      ]
    },
    {
      title: 'Barang',
      items: [
        {
          title: 'Stok Barang',
          url: '/item',
          icon: 'IconPackages',
        },
        {
          title: 'Barang Masuk',
          url: '/item-restock',
          icon: 'IconPackagesPlus',
        },
        {
          title: 'Barang Keluar',
          url: '/item-out',
          icon: 'IconPackagesMinus',
        },
        {
          title: 'Stok Opname',
          url: '/item-balance',
          icon: 'IconPackagesCheck',
        },
      ],

    },
    {
      title: 'General',
      items: [
        {
          title: 'Kategori Barang',
          url: '/category',
          icon: 'IconLayoutDashboard',
        },

        {
          title: 'Satuan Barang',
          url: '/unit',
          icon: 'IconBoxes',
        },
      ],
    },
    {
      title: 'Users',
      items: [
        {
          title: 'Petugas',
          url: '/operator',
          icon: 'IconUserRoundCog',
        },
        {
          title: 'Divisi',
          url: '/division',
          icon: 'IconAward',
        },
      ]
    }

  ],
  OPERATOR: [

    {
      title: 'Dashboard',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: 'IconGauge',
        }
      ]
    },
    {
      title: 'User',
      items: [
        {
          title: 'Pengambil',
          url: '/user',
          icon: 'IconUserRound',
        }
      ]
    },
    {
      title: 'Barang',
      items: [
        {
          title: 'Stok Barang',
          url: '/item',
          icon: 'IconPackages',
        },
        {
          title: 'Barang Masuk',
          url: '/item-restock',
          icon: 'IconPackagesPlus',
        },
        {
          title: 'Barang Keluar',
          url: '/item-out',
          icon: 'IconPackagesMinus',
        },
        {
          title: 'Stok Opname',
          url: '/item-balance',
          icon: 'IconPackagesCheck',
        },
      ],

    },


  ],
  INSPECTOR: [

    {
      title: 'Dashboard',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: 'IconGauge',
        }
      ]
    },
    {
      title: 'User',
      items: [
        {
          title: 'Pengambil',
          url: '/user',
          icon: 'IconUserRound',
        }
      ]
    },
    {
      title: 'Barang',
      items: [
        {
          title: 'Stok Barang',
          url: '/item',
          icon: 'IconPackages',
        },
        {
          title: 'Barang Masuk',
          url: '/item-restock',
          icon: 'IconPackagesPlus',
        },
        {
          title: 'Barang Keluar',
          url: '/item-out',
          icon: 'IconPackagesMinus',
        },
        {
          title: 'Stok Opname',
          url: '/item-balance',
          icon: 'IconPackagesCheck',
        },
      ],

    },

  ],
}