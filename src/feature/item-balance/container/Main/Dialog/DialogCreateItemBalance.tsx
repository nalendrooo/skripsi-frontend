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
import { IBodyCreateItemBalanceModel, IBodyCreateItemModel, IBodyCreateItemRestockModel } from "@/model/item"
import useCreateItem from "@/feature/item/hooks/useCreateItem"
import { Checkbox } from "@/components/ui/checkbox"
import useGetItem from "@/feature/item-restock/hooks/useGetItem"
import { ComboboxDemo } from "@/feature/_global/component/Combobox/Combobox"
import useCreateItemRestock from "@/feature/item-restock/hooks/useCreateItemRestock"
import useCreateItemBalance from "@/feature/item-balance/hooks/useCreateItemBalance"

const schema = yup.object({
    news: yup.string(),
    amount: yup
        .number()
        .typeError("Stok harus berupa angka")
        .required("Stok tidak boleh kosong")
        .positive("Stok harus lebih dari 0"),
    description: yup.string(),
    itemId: yup
        .number()
        .typeError("Barang harus dipilih")
        .moreThan(0, "Barang harus dipilih"),

})


const defaultValues = {
    itemId: undefined,
    amount: 0,
    news: 'FALSE',
    description: '',
}

const DialogCreateItemBalance = () => {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useCreateItemBalance()

    const { data: item } = useGetItem()


    // const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    })
    const onSubmit = async (data: IBodyCreateItemBalanceModel) => {
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
            <DialogContent className="sm:max-w-[625px]" >
                <DialogHeader>
                    <DialogTitle>Restock Barang</DialogTitle>
                    <DialogDescription>
                        Item akan digunakan sebagai satuan dalam item.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">Barang</Label>
                        <Controller
                            control={control}
                            name="itemId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                                    <SelectTrigger id="itemId" className="w-full">
                                        <SelectValue placeholder="Pilih barang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {item?.data?.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {/* <ComboboxDemo /> */}
                        {errors.itemId && <p className="text-sm text-red-500">{errors.itemId.message}</p>}
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="stock">Jumlah</Label>
                        <Input
                            id="amount"
                            inputMode="numeric"
                            type="number"
                            {...register("amount")}
                            placeholder="Stok"
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                    </div>

                    <div className="col-span-2 grid items-center gap-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Deskripsi item"
                        />
                    </div>
                    <div className="grid items-center gap-2">
                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
                            <Controller
                                name="news"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="toggle-2"
                                        checked={field.value === 'TRUE'}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked ? 'TRUE' : 'FALSE')
                                        }}
                                        className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                                    />
                                )}
                            />
                            <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    Berita Acara
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    Aktifkan berita acara untuk restock barang ini
                                </p>
                            </div>
                        </Label>
                        {errors.news && (
                            <p className="text-sm text-red-500">{errors.news.message}</p>
                        )}
                    </div>


                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
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

export default DialogCreateItemBalance