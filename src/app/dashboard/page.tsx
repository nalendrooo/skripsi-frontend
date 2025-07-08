'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { Button } from '@/components/ui/button'
import useGetTopUser from '@/feature/dashboard/useGetTopUser'
import useGetDashboard from '@/feature/dashboard/useGetDashboard'
import { Package, PackageMinus, PackagePlus, Users } from 'lucide-react'


const page = () => {
    const { data } = useGetTopUser()
    const { data: dashboard } = useGetDashboard()
    return (
        <div>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
                <div className='flex items-center space-x-2'>
                    {/* <Button>Download</Button> */}
                </div>
            </div>
            <div className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                            <CardTitle className='text-sm font-medium'>
                                Stok Barang
                            </CardTitle>
                            {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                            </svg> */}
                            <Package />
                        </CardHeader>
                        <CardContent>
                            <div className='text-4xl font-bold'>{dashboard?.item}<span className='ml-2 text-sm text-muted-foreground'>
                                Barang
                            </span></div>
                            {/* <p className='text-xs text-muted-foreground'>
                                +20.1% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                            <CardTitle className='text-sm font-medium'>
                                Barang Keluar
                            </CardTitle>
                            {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                                <circle cx='9' cy='7' r='4' />
                                <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                            </svg> */}
                            <PackagePlus />
                        </CardHeader>
                        <CardContent>
                            <div className='text-4xl font-bold'>{dashboard?.itemOut}<span className='ml-2 text-sm text-muted-foreground'>
                                Barang
                            </span></div>
                            <p className='text-xs text-muted-foreground'>
                                {/* barang  */}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                            <CardTitle className='text-sm font-medium'>
                                Barang Masuk
                            </CardTitle>
                            {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <rect width='20' height='14' x='2' y='5' rx='2' />
                                <path d='M2 10h20' />
                            </svg> */}
                            <PackageMinus />
                        </CardHeader>
                        <CardContent>
                            <div className='text-4xl font-bold'>{dashboard?.itemRestock}<span className='ml-2 text-sm text-muted-foreground'>
                                Barang
                            </span></div>
                            {/* <p className='text-xs text-muted-foreground'>
                                +19% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1'>
                            <CardTitle className='text-sm font-medium'>
                                Jumlah Pengambil
                            </CardTitle>
                            {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                            </svg> */}
                            <Users />
                        </CardHeader>
                        <CardContent>
                            <div className='text-4xl font-bold '>{dashboard?.user}<span className='ml-2 text-sm text-muted-foreground'>
                                Pengamil
                            </span></div>
                            {/* <p className='text-xs text-muted-foreground'>
                                +201 since last hour
                            </p> */}
                        </CardContent>
                    </Card>
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                    <Card className='col-span-1 lg:col-span-4'>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className='pl-2'>
                            <Overview />
                        </CardContent>
                    </Card>
                    <Card className='col-span-1 lg:col-span-3'>
                        <CardHeader>
                            <CardTitle>Barang Keluar</CardTitle>
                            <CardDescription>
                                {data?.item} Barang keluar dalam bulan Mei.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentSales />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default page