import { IBodyTitleModel } from '@/model/_global';
import unitService from '@/services/unit';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useGetUnit from './useGetUnit';
import { toast } from 'sonner';

interface IMutationVariables {
    body: IBodyTitleModel
    id: number
}

const useUpdateUnit = () => {
    const { refetch } = useGetUnit()
    const mutation = useMutation({
        mutationKey: ['update-unit'],
        mutationFn: ({ body, id }: IMutationVariables) => {
            return unitService
                .update({
                    body,
                    id
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Unit berhasil diubah')
            refetch()
        },
        onError: () => {
            toast.error('Unit gagal diubah')
        },
    });

    return mutation;
}

export default useUpdateUnit