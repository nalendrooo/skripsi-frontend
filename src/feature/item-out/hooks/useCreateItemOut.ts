import { IBodyCreateItemBalanceModel, IBodyCreateItemModel } from '@/model/item';
import itemService from '@/services/item';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetItem from './useGetItemOut';
import useGetItemOut from './useGetItemOut';
import itemOutService from '@/services/item-out';

interface IMutationVariables {
    body: IBodyCreateItemBalanceModel
}

const useCreateItemOut = () => {
    const { refetch } = useGetItemOut()
    const mutation = useMutation({
        mutationKey: ['create-item-out'],
        mutationFn: ({ body }: IMutationVariables) => {
            return itemOutService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Barang berhasil diambil')
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error?.message || 'Barang gagal diambil')
        },
    });

    return mutation;
}

export default useCreateItemOut