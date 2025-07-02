'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserSearch } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useCreateItemOut from "@/feature/item-out/hooks/useCreateItemOut"
import useGetUser from "@/feature/item-out/hooks/useGetUser"
import useGetItem from "@/feature/item-restock/hooks/useGetItem"
import { IBodyCreateItemBalanceModel } from "@/model/item"
import * as yup from "yup"
import FormCreateUser from "../../Form/FormCreateUser"

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
        .moreThan(0, "Barang harus dipilih")
        .required("Barang harus dipilih"),
    userId: yup
        .number()
        .typeError("Pengambil harus dipilih")
        .moreThan(0, "Pengambil harus dipilih")
        .required("Pengambil harus dipilih"),

})


const defaultValues = {
    itemId: 0,
    userId: 0,
    amount: 0,
    news: 'FALSE',
}

const DialogCreateItemOut = () => {
    const [tab, setTab] = useState("old")
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useCreateItemOut()

    const { data: item } = useGetItem()
    const { data: user } = useGetUser()

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
        defaultValues
    })
    const onSubmit = async (data: IBodyCreateItemBalanceModel) => {
        await mutateAsync({ body: data })
        reset()
        setOpen(false)
    }

    const selectedItemId = watch("itemId")
    const selectedItem = item?.data?.find((itm) => itm.id === selectedItemId)

    const selectedUserId = watch("userId")
    const selectedUser = user?.data?.find((u) => u.id === selectedUserId)


    return (
        <div className="flex size-full gap-5">

            <div className="w-1/2">

                <div className="flex flex-col gap-4 py-4 ">
                    <div className="grid items-center gap-2">
                        <Label htmlFor="type">Pengambil</Label>
                        <Controller
                            control={control}
                            name="userId"
                            render={({ field }) => (
                                <Select
                                    key={watch("userId") ?? "initial"}
                                    onValueChange={(val) => field.onChange(Number(val))}
                                    value={field.value ? field.value?.toString() : ''}
                                >
                                    <SelectTrigger id="userId" className="w-full">
                                        <SelectValue placeholder="Pilih nama pengambil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {user?.data?.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name} {`(${type.divisionTitle ?? '-'})`} - {type.telephone}
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
                                <Select
                                    key={watch("itemId") ?? "initial"}
                                    onValueChange={(val) => field.onChange(Number(val))}
                                    value={field.value ? field.value?.toString() : ''}
                                >
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
                    disabled={isSubmitting || isPending || !isValid || !isDirty}
                    loading={isSubmitting || isPending}
                    className="w-full"
                >
                    Simpan
                </Button>

            </div >
            <div className="w-1/2">
                <div className="flex w-full  flex-col gap-6">
                    <Tabs defaultValue="old" value={tab} onValueChange={setTab}>
                        <TabsList>
                            <TabsTrigger value="old">Data Pengambil</TabsTrigger>
                            <TabsTrigger value="new">Pengambil Baru</TabsTrigger>
                        </TabsList>
                        <TabsContent value="old">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Pengambil</CardTitle>
                                    <CardDescription>
                                        Menampilkan informasi berdasarkan pengambil yang dipilih.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 text-sm">
                                    {selectedUser ? (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="user-name">Nama</Label>
                                                <Input id="user-name" readOnly value={selectedUser.name} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="user-division">Divisi</Label>
                                                <Input id="user-division" readOnly value={selectedUser.divisionTitle ?? "-"} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="user-telephone">No. Telepon</Label>
                                                <Input id="user-telephone" readOnly value={selectedUser.telephone} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="user-code">Kode Pegawai</Label>
                                                <Input id="user-code" readOnly value={selectedUser.code} />
                                            </div>
                                        </>
                                    ) : (
                                        <UserSearch className="mx-auto h-20 w-20 my-6 text-muted-foreground" />
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="new">
                            <FormCreateUser onClick={() => setTab("old")} />
                        </TabsContent>
                    </Tabs>
                </div>

            </div >
        </div>
    )
}

export default DialogCreateItemOut