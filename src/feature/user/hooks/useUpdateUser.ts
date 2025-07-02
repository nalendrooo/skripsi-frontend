import { IBodyCreateUserModel } from '@/model/user';
import userService from '@/services/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetUser from './useGetUser';

interface IMutationVariables {
    body: IBodyCreateUserModel
    id: number
}

const useUpdateUser = () => {
    const { refetch } = useGetUser()
    const mutation = useMutation({
        mutationKey: ['update-user'],
        mutationFn: ({ body, id }: IMutationVariables) => {
            return userService
                .update({
                    id,
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Pengambil berhasil diupdate')
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error?.message || 'Pengambil gagal diupdate')
        },
    });

    return mutation;
}

export default useUpdateUser