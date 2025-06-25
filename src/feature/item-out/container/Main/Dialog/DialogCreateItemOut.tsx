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
import useGetUser from "@/feature/item-out/hooks/useGetUser"

const schema = yup.object({
    news: yup.string(),
    amount: yup
        .number()
        .typeError("Stok harus berupa angka")
        .required("Stok tidak boleh kosong")
        .positive("Stok harus lebih dari 0"),
    itemId: yup
        .number()
        .typeError("Barang harus dipilih")
        .moreThan(0, "Barang harus dipilih"),
    userId: yup
        .number()
        .typeError("Barang harus dipilih")
        .moreThan(0, "Barang harus dipilih"),

})


const defaultValues = {
    itemId: undefined,
    userId: undefined,
    amount: 0,
    news: 'FALSE',
}

const DialogCreateItemOut = () => {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useCreateItemBalance()

    const { data: item } = useGetItem()
    const { data: user } = useGetUser()


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
        <div className="flex size-full gap-5">

            <div className="w-1/2 ">

                <div className="flex flex-col gap-4 py-4 ">
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">User</Label>
                        <Controller
                            control={control}
                            name="userId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                                    <SelectTrigger id="userId" className="w-full">
                                        <SelectValue placeholder="Pilih satuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {user?.data?.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {/* <ComboboxDemo /> */}
                        {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">Barang</Label>
                        <Controller
                            control={control}
                            name="itemId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                                    <SelectTrigger id="itemId" className="w-full">
                                        <SelectValue placeholder="Pilih satuan" />
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

                <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    loading={isSubmitting || isPending}
                    className="w-full"
                >
                    Simpan
                </Button>

            </div >
            <div className="w-1/2">

                <div className="flex flex-col gap-4 py-4">
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">User</Label>
                        <Controller
                            control={control}
                            name="userId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                                    <SelectTrigger id="userId" className="w-full">
                                        <SelectValue placeholder="Pilih satuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {user?.data?.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {/* <ComboboxDemo /> */}
                        {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}
                    </div>
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">Barang</Label>
                        <Controller
                            control={control}
                            name="itemId"
                            render={({ field }) => (
                                <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value?.toString()}>
                                    <SelectTrigger id="itemId" className="w-full">
                                        <SelectValue placeholder="Pilih satuan" />
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

                <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    loading={isSubmitting || isPending}
                    className="w-full"
                >
                    Simpan
                </Button>

            </div >
        </div>
    )
}

export default DialogCreateItemOut