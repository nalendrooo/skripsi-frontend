import { IBodyTitleModel } from '@/model/_global';
import divisionService from '@/services/division';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useGetDivision from './useGetDivision';
import { toast } from 'sonner';

interface IMutationVariables {
    body: IBodyTitleModel
    id: number
}

const useUpdateDivision = () => {
    const { refetch } = useGetDivision()
    const mutation = useMutation({
        mutationKey: ['create-division'],
        mutationFn: ({ body, id }: IMutationVariables) => {
            return divisionService
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

export default useUpdateDivision