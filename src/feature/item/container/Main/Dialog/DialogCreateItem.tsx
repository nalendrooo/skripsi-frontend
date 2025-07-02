'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import useGetCategory from "@/feature/category/hooks/useGetCategory"
import useGetUnit from "@/feature/item/hooks/useGetUnit"
import useCreateUnit from "@/feature/unit/hooks/useCreateUnit"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


import * as yup from "yup"
import { IBodyCreateItemModel } from "@/model/item"
import useCreateItem from "@/feature/item/hooks/useCreateItem"
import { currencyFormatter } from "@/feature/_global/helper/formatter"

const schema = yup.object({
    title: yup.string().required("Nama tidak boleh kosong"),
    code: yup.string().required("Kode tidak boleh kosong"),
    brand: yup.string(),
    location: yup.string(),
    supplier: yup.string(),
    price: yup
        .number()
        .typeError("Stok harus berupa angka"),
    description: yup.string(),
    unitId: yup
        .number()
        .typeError("Satuan harus dipilih")
        .moreThan(0, "Satuan harus dipilih"),
    typeId: yup
        .number()
        .typeError("Kategori harus dipilih")
        .moreThan(0, "Kategori harus dipilih"),
})


const defaultValues = {
    title: '',
    code: '',
    brand: '',
    location: '',
    supplier: '',
    price: 0,
    description: '',
    unitId: undefined,
    typeId: undefined
}

const DialogCreateItem = () => {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useCreateItem()

    const [displayPrice, setDisplayPrice] = useState("");

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, ""); // remove all except numbers
        const numericValue = parseInt(rawValue || "0");

        // Update formatted display
        setDisplayPrice(currencyFormatter.format(numericValue));

        // Simpan angka asli ke form (tanpa format)
        setValue("price", numericValue, { shouldValidate: true });
    };

    const { data: units } = useGetUnit()
    const { data: types } = useGetCategory()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,

        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    })
    const onSubmit = async (data: IBodyCreateItemModel) => {
        await mutateAsync({ body: data })
        reset()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button className='space-x-1' startIcon={<Plus />}>
                    Tambah
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px]" >
                <DialogHeader>
                    <DialogTitle>Buat Barang Baru</DialogTitle>
                    <DialogDescription>
                        Barang akan digunakan sebagai satuan dalam barang.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid items-center gap-2">
                        <Label htmlFor="title">Nama Barang</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="Nama barang"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="code">Kode</Label>
                        <Input
                            id="code"
                            {...register("code")}
                            placeholder="Kode barang"
                        />
                        {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="brand">Merek</Label>
                        <Input
                            id="brand"
                            {...register("brand")}
                            placeholder="Merek"
                        />
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="location">Lokasi</Label>
                        <Input
                            id="location"
                            {...register("location")}
                            placeholder="Lokasi penyimpanan"
                        />
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="supplier">Supplier</Label>
                        <Input
                            id="supplier"
                            {...register("supplier")}
                            placeholder="Supplier"
                        />
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="price">Harga Satuan</Label>
                        <Input
                            id="price"
                            inputMode="numeric"
                            value={displayPrice}
                            onChange={handlePriceChange}
                            placeholder="Harga satuan"
                            className="border-0 rounded p-0 h-auto focus-visible:ring-0 py-1.5 focus-visible:ring-offset-0 pl-2"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>

                    <div className="grid items-center gap-2">
                        <Label htmlFor="unit">Satuan</Label>
                        <Controller
                            control={control}
                            name="unitId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                                    <SelectTrigger id="unit" className="w-full">
                                        <SelectValue placeholder="Pilih satuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {units?.data?.map((unit) => (
                                            <SelectItem key={unit.id} value={unit.id.toString()}>
                                                {unit.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {errors.unitId && <p className="text-red-500 text-sm">{errors.unitId.message}</p>}

                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">Kategori</Label>
                        <Controller
                            control={control}
                            name="typeId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                                    <SelectTrigger id="typeId" className="w-full">
                                        <SelectValue placeholder="Pilih satuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types?.data?.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.typeId && <p className="text-sm text-red-500">{errors.typeId.message}</p>}
                    </div>
                    <div className="col-span-2 grid items-center gap-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Deskripsi item"
                        />
                    </div>

                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={!isDirty || !isValid || isSubmitting}
                        loading={isSubmitting || isPending}
                        className="w-full"
                    >
                        Simpan
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default DialogCreateItem