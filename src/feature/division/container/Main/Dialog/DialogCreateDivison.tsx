'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useCreateDivision from "@/feature/division/hooks/useCreateDivision"
import { Plus } from "lucide-react"
import { useState } from "react"

const DialogCreateDivision = () => {
    const [open, setOpen] = useState(false)
    const { mutateAsync, isPending } = useCreateDivision()

    const [state, setState] = useState({
        title: '',
    })

    const handleSubmit = async () => {
        await mutateAsync({ body: state })
        setState({ title: '' })
        setOpen(false)

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button className='space-x-1' startIcon={<Plus />}>
                    Tambah
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Buat Unit Baru</DialogTitle>
                    <DialogDescription>
                        Unit akan digunakan pada setiap Petugas.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Nama
                        </Label>
                        <Input
                            id="title"
                            value={state.title}
                            onChange={(e) => setState(prev => ({
                                ...prev,
                                title: e.target.value
                            }))}
                            placeholder="Nama unit"
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

export default DialogCreateDivision