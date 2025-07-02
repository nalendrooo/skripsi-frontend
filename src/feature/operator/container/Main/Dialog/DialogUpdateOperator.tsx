'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useGetDivision from '@/feature/operator/hooks/useGetDivision'
import useUpdateOperator from '@/feature/operator/hooks/useUpdateOperator'
import { IBodyCreateOperatorModel, IBodyUpdateOperatorModel, IDataOperator } from '@/model/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { Plus, SquarePen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// Skema validasi
const schema = yup.object({
  name: yup.string().required('Nama tidak boleh kosong'),
  telephone: yup.string().required('Telepon wajib diisi'),
  adminRole: yup.string().required('Role wajib dipilih'),
  divisionId: yup.number().typeError('Divisi wajib dipilih').required('Divisi wajib dipilih'),
})

const DialogUpdateOperator = ({
  item
}: {
  item: IDataOperator
}) => {
  const [open, setOpen] = useState(false)
  const { data: divisions } = useGetDivision()
  const { mutateAsync, isPending } = useUpdateOperator()

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      adminRole: '',
      telephone: '',
      divisionId: undefined,
    },
  })

  const onSubmit = async (data: IBodyUpdateOperatorModel) => {
    await mutateAsync({ body: data, id: item.id })
    reset()
    setOpen(false)
  }

  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        adminRole: item.adminRole,
        telephone: item.telephone,
        divisionId: item.divisionId,
      })
    }
  }, [item])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          startIcon={<SquarePen />}
          className='h-8 px-2 lg:px-3 text-xs lg:text-sm bg-green-500 hover:bg-green-600'
        >
          Ubah
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Petugas {item.name}</DialogTitle>
          <DialogDescription>Masukan data Petugas yang akan diubah</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col grid-cols-2 gap-4 py-4">
          <div className="grid items-center gap-2 col-span-2">
            <Label htmlFor="adminRole">Role</Label>
            <Controller
              control={control}
              name="adminRole"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger id="adminRole" className="w-full">
                    <SelectValue placeholder="Pilih role petugas" />
                  </SelectTrigger>
                  <SelectContent>
                    {['INSPECTOR', 'OPERATOR'].map((role) => (
                      <SelectItem key={role} value={role}>
                        {role} {/* atau ubah jadi title-case */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.adminRole && (
              <p className="text-sm text-red-500">{errors.adminRole.message}</p>
            )}
          </div>

          <div className="grid items-center gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" {...register('name')} placeholder="Nama petugas" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="telephone">Telepon</Label>
            <Input id="telephone" {...register('telephone')} placeholder="Nomor telepon" />
            {errors.telephone && <p className="text-sm text-red-500">{errors.telephone.message}</p>}
          </div>
          <div className="grid items-center gap-2 col-span-2">
            <Label htmlFor="division">Divisi</Label>
            <Controller
              control={control}
              name="divisionId"
              render={({ field }) => (
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value?.toString()}
                >
                  <SelectTrigger id="division" className="w-full">
                    <SelectValue placeholder="Pilih divisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions?.data?.map((d) => (
                      <SelectItem key={d.id} value={d.id.toString()}>
                        {d.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.divisionId && <p className="text-sm text-red-500">{errors.divisionId.message}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || isPending}
            loading={isSubmitting || isPending}
            className="w-full"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogUpdateOperator
