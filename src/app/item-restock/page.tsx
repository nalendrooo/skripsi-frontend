import Header from '@/feature/_global/component/Header/Header'
import DialogCreateUnit from '@/feature/unit/container/Main/Dialog/DialogCreateUnit'
import DataTable from '@/feature/item-restock/container/Main/Table/DataTable'
import DialogCreateItemRestock from '@/feature/item-restock/container/Main/Dialog/DialogCreateItemRestock'

const app = () => {
  return (
    <>
      <Header
        title='Barang Masuk'
        subtitle='Berikut adalah semua list user'
        rightButton={[
          <DialogCreateItemRestock />
        ]}
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