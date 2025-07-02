'use client'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EmptyState from '@/feature/_global/component/Emty/Empty'
import { TableToolbar } from '@/feature/_global/component/Toolbar/TableToolbar'
import useGetUnit from '@/feature/unit/hooks/useGetUnit'
import { formatIndonesianDateTime } from '@/lib/date-formatter'
import { Pen, SquarePen } from 'lucide-react'
import DialogUpdateUnit from '../Dialog/DialogUpdateUnit'

const DataTable = () => {
  const { data } = useGetUnit()
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
                <TableHead >Jumlah Barang</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead>Terakhir diubah</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((item, index) => (
                <TableRow key={index + 1}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item._count?.items}</TableCell>
                  <TableCell>{formatIndonesianDateTime(item.createdAt)}</TableCell>
                  <TableCell>{formatIndonesianDateTime(item.updatedAt)}</TableCell>
                  <TableCell>
                    <DialogUpdateUnit item={item} />
                  </TableCell>
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