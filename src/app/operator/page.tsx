import Header from '@/feature/_global/component/Header/Header'
import DialogCreateOperator from '@/feature/operator/container/Main/Dialog/DialogCreateOperator'
import DataTable from '@/feature/operator/container/Main/Table/DataTable'

const app = () => {
  return (
    <>
      <Header
        title='Petugas'
        subtitle='Berikut adalah semua list Petugas'
        rightButton={[
          <DialogCreateOperator />
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