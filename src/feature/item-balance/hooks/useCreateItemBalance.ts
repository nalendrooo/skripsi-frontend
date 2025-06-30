import { IBodyCreateItemBalanceModel } from '@/model/item';
import itemBalanceService from '@/services/item-balance';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetItemBalance from './useGetItemBalance';

interface IMutationVariables {
    body: IBodyCreateItemBalanceModel
}

const useCreateItemBalance = () => {
    const { refetch } = useGetItemBalance()
    const mutation = useMutation({
        mutationKey: ['create-item-balance'],
        mutationFn: ({ body }: IMutationVariables) => {
            return itemBalanceService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Barang berhasil diopname')
            refetch()
        },
        onError: () => {
            toast.error('Barang gagal diopname')
        },
    });

    return mutation;
}

export default useCreateItemBalance