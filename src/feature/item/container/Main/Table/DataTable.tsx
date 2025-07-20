'use client'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EmptyState from '@/feature/_global/component/Emty/Empty'
import AutoPagination from '@/feature/_global/component/Pagination/AutoPagination'
import useGetItem from '@/feature/item/hooks/useGetItem'
import { formatIndonesianDateTime, formatRupiah } from '@/lib/date-formatter'
import DialogUpdateItem from '../Dialog/DialogUpdateItem'
import { TableToolbar } from '@/feature/item/component/Toolbar/TableToolbar'
import useUpdateItemStatus from '@/feature/item/hooks/useUpdateItemStatus'
import useProfile from '@/feature/_global/hooks/useProfile'

const DataTable = () => {
  const { data } = useGetItem()
  const { mutateAsync } = useUpdateItemStatus()
  const profile = useProfile()
  const handleUpdateStatus = async (itemId: number, isActive: boolean) => {
    await mutateAsync({ itemId, isActive })
  }
  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      <TableToolbar />
      <div className='rounded-md border'>
        {data?.data?.length === 0 ? (
          <EmptyState />
        ) :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kode barang</TableHead>
                <TableHead>Merk</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Satuan</TableHead>
                <TableHead>Kategori</TableHead>
                {profile?.role !== 'INSPECTOR' && <TableHead>Status</TableHead>}
                <TableHead>Dibuat</TableHead>
                <TableHead>Terakhir diubah</TableHead>
                {profile?.role !== 'INSPECTOR' && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.brand || '-'}</TableCell>
                  <TableCell>{item.location || '-'}</TableCell>
                  <TableCell>{item.supplier || '-'}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{formatRupiah(item.price)}</TableCell>
                  <TableCell>{item.description || '-'}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  {profile?.role !== 'INSPECTOR' && <TableCell>
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={(val) => {
                        handleUpdateStatus(item.id, val)
                      }}
                    />
                  </TableCell>}

                  <TableCell>{formatIndonesianDateTime(item.createdAt)}</TableCell>
                  <TableCell>{formatIndonesianDateTime(item.updatedAt)}</TableCell>
                  {profile?.role !== 'INSPECTOR' && <TableCell>
                    <DialogUpdateItem item={item} />
                  </TableCell>}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        }

      </div>
      {/* <AutoPagination /> */}
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}

export default DataTable