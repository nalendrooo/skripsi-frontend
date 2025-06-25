'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AutoPagination from '@/feature/_global/component/Pagination/AutoPagination'
import { TableToolbar } from '@/feature/_global/component/Toolbar/TableToolbar'
import useGetItem from '@/feature/item/hooks/useGetItem'
import useGetOperator from '@/feature/operator/hooks/useGetOperator'
import { formatIndonesianDateTime, formatRupiah } from '@/lib/date-formatter'

const DataTable = () => {
  const { data } = useGetOperator()
  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      <TableToolbar />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Divisi</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead>Terakhir Diubah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>{user.adminRole}</TableCell>
                <TableCell>{user.division?.title || '-'}</TableCell>
                <TableCell>{formatIndonesianDateTime(user.createdAt)}</TableCell>
                <TableCell>{formatIndonesianDateTime(user.updatedAt)}</TableCell>
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