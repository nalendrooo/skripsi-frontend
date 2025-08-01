'use client'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AutoPagination from '@/feature/_global/component/Pagination/AutoPagination'
import useGetItemOut from '@/feature/item-out/hooks/useGetItemOut'
import useGetItem from '@/feature/item/hooks/useGetItem'
import { formatIndonesianDateTime, formatRupiah } from '@/lib/date-formatter'
import { cn } from '@/lib/utils'
import { BadgeCheck, X } from 'lucide-react'
import DialogCreateItemOut from '../Dialog/DialogCreateItemOut'
import EmptyState from '@/feature/_global/component/Emty/Empty'
import DialogDeleteItemOut from '../Dialog/DialogDeleteItemOut'
import { TableToolbar } from '@/feature/item-out/component/Toolbar/TableToolbar'
import useProfile from '@/feature/_global/hooks/useProfile'

const DataTable = () => {
  const profile = useProfile()
  const { data } = useGetItemOut()
  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      {profile?.role !== 'INSPECTOR' && <DialogCreateItemOut />}
      <TableToolbar />
      <div className='rounded-md border'>
        {data?.data.length === 0 ? (
          <EmptyState />
        ) : (

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Pengambil</TableHead>
                <TableHead>Divisi</TableHead>
                <TableHead>Telephone</TableHead>
                <TableHead>Nama barang</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Kode barang</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Berita Acara</TableHead>
                <TableHead>Petugas</TableHead>
                <TableHead>Dibuat</TableHead>
                {profile?.role !== 'INSPECTOR' && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.user.name}</TableCell>
                  <TableCell>{item.user.division}</TableCell>
                  <TableCell>{item.user.telephone}</TableCell>
                  <TableCell>{item.item.title}</TableCell>
                  <TableCell>{`${item.amount} ${item.item.unit}`}</TableCell>
                  <TableCell>{item.item.code}</TableCell>
                  <TableCell>{item.item.category || '-'}</TableCell>
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
                  <TableCell>{item.operator}</TableCell>
                  <TableCell>{formatIndonesianDateTime(item.createdAt)}</TableCell>
                  {profile?.role !== 'INSPECTOR' && <TableCell><DialogDeleteItemOut item={item} /></TableCell>}

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