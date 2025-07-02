'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useUpdateDivision from "@/feature/division/hooks/useUpdateDivision"
import useDeleteItemOut from "@/feature/item-out/hooks/useDeleteItemOut"
import { IDataTitle } from "@/model/_global"
import { IDataItemOut } from "@/model/item"
import { SquarePen, Trash } from "lucide-react"
import { useEffect, useState } from "react"

const DialogDeleteItemOut = ({
    item
}: {
    item: IDataItemOut
}) => {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useDeleteItemOut()

    const [state, setState] = useState<{ id?: number }>({
        id: undefined,
    })

    const handleSubmit = async () => {
        await mutateAsync({ id: item.id })
        setState({ id: undefined })
        setOpen(false)
    }

    useEffect(() => {
        setState(prev => ({
            ...prev,
            id: item.id
        }))
    }, [item])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button
                    startIcon={<Trash />}
                    className='h-8 px-2 lg:px-3 text-xs lg:text-sm bg-red-500 hover:bg-red-600 text-white'
                >
                    Hapus
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Hapus data barang keluar ini?</DialogTitle>
                    <DialogDescription>
                        Jumlah stok akan dikembalikan ke stok barang.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        loading={isPending}
                        className="w-full "
                        variant={"destructive"}
                        disabled={!state.id}
                        onClick={handleSubmit}
                    >
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogDeleteItemOut