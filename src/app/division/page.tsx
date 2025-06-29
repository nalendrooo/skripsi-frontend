import Header from '@/feature/_global/component/Header/Header'
import DialogCreateCategory from '@/feature/category/container/Main/Dialog/DialogCreateCategory'
import DataTable from '@/feature/division/container/Main/Table/DataTable'
import DialogCreateDivision from '@/feature/division/container/Main/Dialog/DialogCreateDivison'
import React from 'react'

const app = () => {
  return (
    <>
      <Header
        title='Unit'
        subtitle='Berikut adalah semua list unit'
        rightButton={[
          <DialogCreateDivision />
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