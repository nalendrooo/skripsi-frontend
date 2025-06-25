import { IBodyCreateItemModel, IBodyCreateItemRestockModel } from '@/model/item';
import itemService from '@/services/item';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import itemRestockService from '@/services/item-restock';
import useGetItemBalance from './useGetItemBalance';
import itemBalanceService from '@/services/item-balance';

interface IMutationVariables {
    body: IBodyCreateItemRestockModel
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