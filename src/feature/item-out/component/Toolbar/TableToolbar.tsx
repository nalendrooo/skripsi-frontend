// import { Cross2Icon } from '@radix-ui/react-icons'
// import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API_ENDPOINTS } from '@/core/app';
import useProfile from '@/feature/_global/hooks/useProfile';
import { Cross, Search, Sheet, X } from 'lucide-react'
import { useState } from 'react';
// import { DataTableViewOptions } from '../components/data-table-view-options'
// import { priorities, statuses } from '../data/data'
// import { DataTableFacetedFilter } from './data-table-faceted-filter'

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>
// }

export function TableToolbar() {
  const profile = useProfile()
  const [isLoading, setIsLoading] = useState(false)

  // const handleDownloadExcel = async () => {
  //     setIsLoading(true)
  //     const newWindow = window.open(API_ENDPOINTS.downloadExcel + '/item-out', '_blank');

  //     if (newWindow) {
  //         setTimeout(() => {
  //             newWindow.close();
  //         }, 100);

  //         setIsLoading(false)
  //     }
  //     setIsLoading(false)
  // };

  const handleDownloadExcel = () => {
    // 1. Set isLoading menjadi TRUE segera sebelum download dimulai
    setIsLoading(true); // Gantikan button download dengan spinner/disable

    // 2. Buat elemen link <a>
    const link = document.createElement('a');

    // Tentukan URL endpoint download
    link.href = API_ENDPOINTS.downloadExcel + '/item-out';

    // Atur atribut download
    link.setAttribute('download', 'List-Barang.xlsx');

    // Tambahkan link ke body
    document.body.appendChild(link);

    // Pemicu klik (memulai proses download)
    link.click();

    // Bersihkan elemen link
    document.body.removeChild(link);

    // 3. Set isLoading menjadi FALSE setelah jeda waktu
    // Pilih jeda waktu (misalnya 3 hingga 5 detik) agar pengguna melihat indikator loading
    // selama file sedang dibuat oleh backend dan dikirim ke browser.
    const DOWNLOAD_TIMEOUT = 3000; // 3 detik

    setTimeout(() => {
      setIsLoading(false);
    }, DOWNLOAD_TIMEOUT);
  };

  return (
    <div className={`flex items-center ${profile?.role === 'INSPECTOR' ? 'justify-start' : 'justify-end'}`}>
      {/* <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'> */}
      <div className={`flex  items-center gap-x-2 `}>
        {/* <Input
                    placeholder='Cari nama barang ...'
                    //   value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    //   onChange={(event) =>
                    //     table.getColumn('title')?.setFilterValue(event.target.value)
                    //   }
                    icon={<Search className="w-4 h-4" />}
                    className='h-8 w-[150px] lg:w-[250px]'
                /> */}
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
        <Button
          variant='success'
          className='h-8 px-2 lg:px-3'
          startIcon={<Sheet />}
          loading={isLoading}
          onClick={handleDownloadExcel}
        >
          Download Excel
        </Button>

      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
