import { IBodyCreateItemModel, IBodyCreateItemRestockModel } from '@/model/item';
import itemService from '@/services/item';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetItem from './useGetItemRestock';
import useGetItemRestock from './useGetItemRestock';
import itemRestockService from '@/services/item-restock';

interface IMutationVariables {
    body: IBodyCreateItemRestockModel
}

const useCreateItemRestock = () => {
    const { refetch } = useGetItemRestock()
    const mutation = useMutation({
        mutationKey: ['create-item-restock'],
        mutationFn: ({ body }: IMutationVariables) => {
            return itemRestockService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Item berhasil ditambahkan')
            refetch()
        },
        onError: () => {
            toast.error('Item gagal ditambahkan')
        },
    });

    return mutation;
}

export default useCreateItemRestock