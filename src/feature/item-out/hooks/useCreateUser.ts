import { IBodyCreateUserModel } from '@/model/user';
import userService from '@/services/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetUser from './useGetUser';

interface IMutationVariables {
    body: IBodyCreateUserModel
}

const useCreateUser = () => {
    const { refetch } = useGetUser()
    const mutation = useMutation({
        mutationKey: ['create-user'],
        mutationFn: ({ body }: IMutationVariables) => {
            return userService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Pengambil berhasil ditambahkan')
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error?.message || 'Pengambil gagal ditambahkan')
        },
    });

    return mutation;
}

export default useCreateUser