'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import useGetDivision from '@/feature/operator/hooks/useGetDivision'
import { IBodyCreateOperatorModel } from '@/model/user'
import useCreateOperator from '@/feature/operator/hooks/useCreateOperator'

// Skema validasi
const schema = yup.object({
  name: yup.string().required('Nama tidak boleh kosong'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
  telephone: yup.string().required('Telepon wajib diisi'),
  divisionId: yup.number().typeError('Divisi wajib dipilih').required('Divisi wajib dipilih'),
})

const DialogCreateOperator = () => {
  const [open, setOpen] = useState(false)
  const { data: divisions } = useGetDivision()
  const { mutateAsync, isPending } = useCreateOperator()

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
      email: '',
      password: '',
      telephone: '',
      divisionId: undefined,
    },
  })

  const onSubmit = async (data: IBodyCreateOperatorModel) => {
    await mutateAsync({ body: data })
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-1" startIcon={<Plus />}>
          Tambah Petugas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Petugas</DialogTitle>
          <DialogDescription>Masukan data Petugas yang akan dibuat</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col grid-cols-2 gap-4 py-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" {...register('name')} placeholder="Nama petugas" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register('email')} placeholder="Email petugas" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="text" {...register('password')} placeholder="Password" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
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

export default DialogCreateOperator
