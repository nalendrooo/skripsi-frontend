'use client'
import Header from '@/feature/_global/component/Header/Header'
import useProfile from '@/feature/_global/hooks/useProfile'
import DialogCreateItemRestock from '@/feature/item-restock/container/Main/Dialog/DialogCreateItemRestock'
import DataTable from '@/feature/item-restock/container/Main/Table/DataTable'

const app = () => {
  const profile = useProfile()
  return (
    <>
      <Header
        title='Barang Masuk'
        subtitle='Berikut adalah list barang masuk'
        rightButton={profile?.role !== 'INSPECTOR' ? [
          <DialogCreateItemRestock />
        ] : []}
      />
      <div
        className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'
      >
        <DataTable />
      </div>
    </>
  )
}

export default app