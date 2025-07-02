import itemBalanceService from '@/services/item-balance';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetItemBalance from './useGetItemBalance';

interface IMutationVariables {
    id: number
}

const useDeleteItemBalance = () => {
    const { refetch } = useGetItemBalance()
    const mutation = useMutation({
        mutationKey: ['delete-item-balance'],
        mutationFn: ({ id }: IMutationVariables) => {
            return itemBalanceService.delete({
                id
            })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Data stok opname berhasil dihapus')
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error?.message || 'Data stok opname gagal dihapus')
        },
    });

    return mutation;
}

export default useDeleteItemBalance