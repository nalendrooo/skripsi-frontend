import { IBodyLoginModel } from '@/model/user';
import userService from '@/services/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface IMutationVariables {
    body: IBodyLoginModel
}

const useLogin = () => {
    const router = useRouter()
    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ body }: IMutationVariables) => {
            return userService
                .login({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: (r) => {
            localStorage.setItem('token', r?.token)
            router.push('/dashboard')
            toast.success('Anda berhasil login')
        },
        onError: (e: any) => {
            toast.error(e.response.data.error.message || 'Anda gagal login')
        },
    });

    return mutation;
}

export default useLogin