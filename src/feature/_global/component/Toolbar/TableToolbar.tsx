// import { Cross2Icon } from '@radix-ui/react-icons'
// import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Cross, Search, X } from 'lucide-react'
// import { DataTableViewOptions } from '../components/data-table-view-options'
// import { priorities, statuses } from '../data/data'
// import { DataTableFacetedFilter } from './data-table-faceted-filter'

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>
// }

export function TableToolbar() {

    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
                <Input
                    placeholder='Cari nama barang ...'
                    //   value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    //   onChange={(event) =>
                    //     table.getColumn('title')?.setFilterValue(event.target.value)
                    //   }
                    icon={<Search className="w-4 h-4" />}
                    className='h-8 w-[150px] lg:w-[250px]'
                />
                {/* <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title='Priority'
              options={priorities}
            />
          )}
        </div> */}
                {/* <Button
                    variant='outline'
                    className='h-8 px-2 lg:px-3'
                    endIcon={<X />}
                >
                    Reset
                </Button> */}

            </div>
            {/* <DataTableViewOptions table={table} /> */}
        </div>
    )
}
