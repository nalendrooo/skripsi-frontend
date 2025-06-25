import Header from '@/feature/_global/component/Header/Header'
import DialogCreateItem from '@/feature/item/container/Main/Dialog/DialogCreateItem'
import DataTable from '@/feature/item/container/Main/Table/DataTable'

const app = () => {
  return (
    <>
      <Header
        title='Item'
        subtitle='Berikut adalah semua list item'
        rightButton={[
          <DialogCreateItem />
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