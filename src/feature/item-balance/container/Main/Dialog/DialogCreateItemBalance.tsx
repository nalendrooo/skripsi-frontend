'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { yupResolver } from "@hookform/resolvers/yup"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"


import { Checkbox } from "@/components/ui/checkbox"
import useCreateItemBalance from "@/feature/item-balance/hooks/useCreateItemBalance"
import useGetItem from "@/feature/item-restock/hooks/useGetItem"
import { IBodyCreateItemBalanceModel } from "@/model/item"
import * as yup from "yup"
import { toast } from "sonner"

const schema = yup.object({
    news: yup.string().optional(),
    amount: yup
        .number()
        .typeError("Stok harus berupa angka")
        .required("Stok tidak boleh kosong")
        .positive("Stok harus lebih dari 0"),
    description: yup.string().optional(),
    itemId: yup
        .number()
        .transform((value, originalValue) =>
            String(originalValue).trim() === '' ? undefined : value
        )
        .required("Barang harus dipilih")
        .typeError("Barang harus dipilih")
        .moreThan(0, "Barang harus dipilih"),


})

const defaultValues = {
    itemId: 0,
    amount: 0,
    news: 'FALSE',
    description: '',
}

const DialogCreateItemBalance = () => {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useCreateItemBalance()

    const { data: item } = useGetItem()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        watch,
        formState: { errors, isSubmitting, isDirty, isValid, },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
        mode: "onChange",
    })
    const onSubmit = async (data: IBodyCreateItemBalanceModel) => {
        if (!data.itemId) {
            toast.error("Barang harus dipilih")
            return
        }
        await mutateAsync({ body: data })
        reset()
        setOpen(false)
    }

    const selectedItemId = watch("itemId")
    const selectedItem = item?.data?.find((itm) => itm.id === selectedItemId)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button className='space-x-1' startIcon={<Plus />}>
                    Tambah
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]" >
                <DialogHeader>
                    <DialogTitle>Stok Opname</DialogTitle>
                    <DialogDescription>
                        Stok opname  untuk membandingkan stok sistem dan stok fisik yang ada.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">Barang</Label>
                        <Controller
                            control={control}
                            name="itemId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? field.value.toString() : ''}>
                                    <SelectTrigger id="itemId" className="w-full">
                                        <SelectValue placeholder="Pilih nama barang" />
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
                        {selectedItem && (
                            <div className="text-xs text-muted-foreground">
                                Stok saat ini: <span className="font-semibold">{selectedItem.stock} {selectedItem.unit}</span>
                            </div>
                        )}
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="stock">Jumlah stok fisik</Label>
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
                        disabled={!isValid || !isDirty || isSubmitting || isPending}
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