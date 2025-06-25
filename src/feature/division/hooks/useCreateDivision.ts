import { IBodyTitleModel } from '@/model/_global';
import divisionService from '@/services/division';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useGetDivision from './useGetDivision';
import { toast } from 'sonner';

interface IMutationVariables {
    body: IBodyTitleModel
}

const useCreateDivision = () => {
    const { refetch } = useGetDivision()
    const mutation = useMutation({
        mutationKey: ['create-division'],
        mutationFn: ({ body }: IMutationVariables) => {
            return divisionService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Division berhasil ditambahkan')
            refetch()
        },
        onError: () => {
            toast.error('Division gagal ditambahkan')
        },
    });

    return mutation;
}

export default useCreateDivision