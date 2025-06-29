'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useGetDivision from '@/feature/operator/hooks/useGetDivision'
import { IBodyCreateUserModel } from '@/model/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import useCreateUser from '../../hooks/useCreateUser'

// Skema validasi
const schema = yup.object({
    name: yup.string().required('Nama tidak boleh kosong'),
    code: yup.string().required('Nomor Pegawai tidak boleh kosong'),
    telephone: yup.string().required('Telepon wajib diisi'),
    divisionId: yup.number().typeError('Divisi wajib dipilih').required('Divisi wajib dipilih'),
})

const FormCreateUser = () => {
    const [open, setOpen] = useState(false)
    const { data: divisions } = useGetDivision()
    const { mutateAsync, isPending } = useCreateUser()

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
            code: '',
            telephone: '',
            divisionId: undefined,
        },
    })

    const onSubmit = async (data: IBodyCreateUserModel) => {
        await mutateAsync({ body: data })
        reset()
        setOpen(false)
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Pengambil Baru</CardTitle>
                    <CardDescription>
                        Buat data pengambil baru.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex flex-col grid-cols-2 gap-4 py-4">
                        <div className="grid items-center gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" {...register('name')} placeholder="Nama petugas" />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="grid items-center gap-2">
                            <Label htmlFor="name">Nomor Pegawai</Label>
                            <Input id="name" {...register('code')} placeholder="Nomor pegawai" />
                            {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
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
                </CardContent>

                <CardFooter>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting || isPending}
                        loading={isSubmitting || isPending}
                        className="w-full"
                    >
                        Simpan
                    </Button>
                </CardFooter>
            </Card>

        </>
    )
}

export default FormCreateUser
