'use client'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AutoPagination from '@/feature/_global/component/Pagination/AutoPagination'
import { TableToolbar } from '@/feature/_global/component/Toolbar/TableToolbar'
import useGetItemBalance from '@/feature/item-balance/hooks/useGetItemBalance'
import useGetItemOut from '@/feature/item-out/hooks/useGetItemOut'
import useGetItem from '@/feature/item/hooks/useGetItem'
import { formatIndonesianDateTime, formatRupiah } from '@/lib/date-formatter'
import { cn } from '@/lib/utils'
import { BadgeCheck, X } from 'lucide-react'

const DataTable = () => {
  const { data } = useGetItemBalance()
  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      <TableToolbar />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Petugas</TableHead>
              <TableHead>Nama barang</TableHead>
              <TableHead>Stok Awal</TableHead>
              <TableHead>Opname</TableHead>
              <TableHead>Stok Akhir</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Merek</TableHead>
              <TableHead>Berita Acara</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Dibuat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item, index) => (
              <TableRow key={index} className='text-sm'>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.operator}</TableCell>
                <TableCell>{item.item.title}</TableCell>
                <TableCell>{`${item.initialStock} ${item.item.unit}`}</TableCell>
                <TableCell>{`${item.amount} ${item.item.unit}`}</TableCell>
                <TableCell>{`${item.finalStock} ${item.item.unit}`}</TableCell>
                <TableCell>{item.item.code}</TableCell>
                <TableCell>{item.item.category || '-'}</TableCell>
                <TableCell>{item.item.location || '-'}</TableCell>
                <TableCell>{item.item.supplier || '-'}</TableCell>
                <TableCell>{item.item.brand || '-'}</TableCell>
                <TableCell>{
                  <Badge
                    variant="secondary"
                    className={cn(
                      "flex items-center gap-1 text-white",
                      item.news ? "bg-green-500 dark:bg-green-600" : "bg-red-400 dark:bg-red-600"
                    )}
                  >
                    {item.news ? <BadgeCheck className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    {item.news ? "Ya" : "Tidak"}
                  </Badge>
                }
                </TableCell>
                <TableCell>{item.description || '-'}</TableCell>
                <TableCell>{formatIndonesianDateTime(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
      <AutoPagination />
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}

export default DataTable