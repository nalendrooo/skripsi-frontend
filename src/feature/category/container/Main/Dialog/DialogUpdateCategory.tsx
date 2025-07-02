'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useUpdateCategory from "@/feature/category/hooks/useUpdateCategory"
import { IDataTitle } from "@/model/_global"
import { SquarePen } from "lucide-react"
import { useEffect, useState } from "react"

const DialogUpdateCategory = ({
    item
}: {
    item: IDataTitle
}) => {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useUpdateCategory()

    const [state, setState] = useState({
        title: '',
    })

    const handleSubmit = async () => {
        await mutateAsync({ body: state, id: item.id })
        setState({ title: '' })
        setOpen(false)
    }

    useEffect(() => {
        setState(prev => ({
            ...prev,
            title: item.title
        }))
    }, [item])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button
                    startIcon={<SquarePen />}
                    className='h-8 px-2 lg:px-3 text-xs lg:text-sm bg-green-500 hover:bg-green-600'
                >
                    Ubah
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Ubah nama satuan barang</DialogTitle>
                    <DialogDescription>
                        Unit akan digunakan sebagai satuan dalam barang.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Nama satuan
                        </Label>
                        <Input
                            id="title"
                            value={state.title}
                            onChange={(e) => setState(prev => ({
                                ...prev,
                                title: e.target.value
                            }))}
                            placeholder="Nama kategori barang"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        loading={isPending}
                        className="w-full"
                        disabled={!state.title}
                        onClick={handleSubmit}
                    >
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogUpdateCategory