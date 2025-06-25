import { IBodyTitleModel } from '@/model/_global';
import unitService from '@/services/unit';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useGetUnit from './useGetUnit';
import { toast } from 'sonner';

interface IMutationVariables {
    body: IBodyTitleModel
}

const useCreateUnit = () => {
    const { refetch } = useGetUnit()
    const mutation = useMutation({
        mutationKey: ['create-unit'],
        mutationFn: ({ body }: IMutationVariables) => {
            return unitService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Unit berhasil ditambahkan')
            refetch()
        },
        onError: () => {
            toast.error('Unit gagal ditambahkan')
        },
    });

    return mutation;
}

export default useCreateUnit