'use client'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AutoPagination from '@/feature/_global/component/Pagination/AutoPagination'
import { TableToolbar } from '@/feature/_global/component/Toolbar/TableToolbar'
import { invoices } from '@/feature/category/constant/constant'
import useGetCategory from '@/feature/category/hooks/useGetCategory'
import useGetDivision from '@/feature/division/hooks/useGetDivision'
import useGetUnit from '@/feature/unit/hooks/useGetUnit'
import useGetUser from '@/feature/user/hooks/useGetUser'
import { formatIndonesianDateTime } from '@/lib/date-formatter'
import React from 'react'
import DialogUpdateUser from '../Dialog/DialogUpdateUser'
import EmptyState from '@/feature/_global/component/Emty/Empty'
import useUpdateUserStatus from '@/feature/user/hooks/useUpdateUserStatus'
import useProfile from '@/feature/_global/hooks/useProfile'

const DataTable = () => {
  const { data } = useGetUser()
  const { mutateAsync } = useUpdateUserStatus()

  const handleUpdateStatus = async (userId: number, isActive: boolean) => {
    await mutateAsync({ userId, isActive })
  }

  const profile = useProfile()
  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      {/* <TableToolbar /> */}
      <div className='rounded-md border'>
        {data?.data?.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead >Nama</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>Telephone</TableHead>
                {profile?.role !== 'INSPECTOR' && <TableHead>Status</TableHead>}
                <TableHead className='text-center'>Total Pengambilan</TableHead>
                {profile?.role !== 'INSPECTOR' && <TableHead className="text-center">Aksi</TableHead>}

              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((item, index) => (
                <TableRow key={index + 1}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.code || '-'}</TableCell>
                  <TableCell>{item.divisionTitle}</TableCell>
                  <TableCell>{item.telephone}</TableCell>
                  {profile?.role !== 'INSPECTOR' && <TableCell>
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={(val) => {
                        handleUpdateStatus(item.id, val)
                      }}
                    />
                  </TableCell>}
                  <TableCell className="text-center">{item._count}</TableCell>
                  {profile?.role !== 'INSPECTOR' && <TableCell className="text-center">
                    <DialogUpdateUser item={item} />
                  </TableCell>}

                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
          </Table>
        )}
      </div>
      {/* <AutoPagination /> */}
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}

export default DataTable