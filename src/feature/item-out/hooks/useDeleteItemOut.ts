import { IBodyTitleModel } from '@/model/_global';
import divisionService from '@/services/division';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetItemOut from './useGetItemOut';
import itemOutService from '@/services/item-out';

interface IMutationVariables {
    id: number
}

const useDeleteItemOut = () => {
    const { refetch } = useGetItemOut()
    const mutation = useMutation({
        mutationKey: ['delete-item-out'],
        mutationFn: ({ id }: IMutationVariables) => {
            return itemOutService.delete({
                id
            })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Barang masuk berhasil dihapus')
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error?.message || 'Barang masuk gagal dihapus')
        },
    });

    return mutation;
}

export default useDeleteItemOut