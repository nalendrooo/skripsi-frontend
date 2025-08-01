'use client'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ComboboxDemo } from '@/feature/_global/component/Combobox/Combobox'
import EmptyState from '@/feature/_global/component/Emty/Empty'
import AutoPagination from '@/feature/_global/component/Pagination/AutoPagination'
import { TableToolbar } from '@/feature/item-restock/component/Toolbar/TableToolbar'
import useGetItemRestock from '@/feature/item-restock/hooks/useGetItemRestock'
import useGetItem from '@/feature/item/hooks/useGetItem'
import { formatIndonesianDateTime, formatRupiah } from '@/lib/date-formatter'
import { cn } from '@/lib/utils'
import { BadgeCheck, BadgeCheckIcon, X } from 'lucide-react'

const DataTable = () => {
  const { data } = useGetItemRestock()
  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      <TableToolbar />
      <div className='rounded-md border'>
        {data?.data?.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                {/* <TableHead>Kode restock</TableHead> */}
                <TableHead>Petugas</TableHead>
                <TableHead>Nama barang</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Kode barang</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Merek</TableHead>
                <TableHead>Berita acara</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((item, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{index + 1}</TableCell> */}
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.admin}</TableCell>
                  <TableCell>{item.item.title}</TableCell>
                  <TableCell>{`${item.amount} ${item.item.unit}`}</TableCell>
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
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{formatIndonesianDateTime(item.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

      </div>
      {/* <AutoPagination /> */}
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}

export default DataTable