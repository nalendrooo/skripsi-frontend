import { IBodyCreateItemModel } from '@/model/item';
import itemService from '@/services/item';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetItem from './useGetItem';

interface IMutationVariables {
    body: IBodyCreateItemModel
}

const useCreateItem = () => {
    const { refetch } = useGetItem()
    const mutation = useMutation({
        mutationKey: ['create-item'],
        mutationFn: ({ body }: IMutationVariables) => {
            return itemService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Barang berhasil ditambahkan')
            refetch()
        },
        onError: () => {
            toast.error('Barang gagal ditambahkan')
        },
    });

    return mutation;
}

export default useCreateItem