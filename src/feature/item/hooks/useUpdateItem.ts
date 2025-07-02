import { IBodyCreateItemModel } from '@/model/item';
import itemService from '@/services/item';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetItem from './useGetItem';

interface IMutationVariables {
    body: IBodyCreateItemModel
    id: number
}

const useUpdateItem = () => {
    const { refetch } = useGetItem()
    const mutation = useMutation({
        mutationKey: ['update-item'],
        mutationFn: ({ body, id }: IMutationVariables) => {
            return itemService
                .update({
                    id,
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Barang berhasil diupdate')
            refetch()
        },
        onError: () => {
            toast.error('Barang gagal diupdate')
        },
    });

    return mutation;
}

export default useUpdateItem