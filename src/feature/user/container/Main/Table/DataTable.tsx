'use client'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
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

const DataTable = () => {
  const { data } = useGetUser()
  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      <TableToolbar />
      <div className='rounded-md border'>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead >Nama</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Telephone</TableHead>
              <TableHead>Total Pengambilan</TableHead>
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
                <TableCell className="text-center">{item._count}</TableCell>
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
      </div>
      <AutoPagination />
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}

export default DataTable