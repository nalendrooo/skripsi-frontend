import { IBodyLoginModel } from '@/model/user';
import userService from '@/services/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const useLogout = () => {
    const router = useRouter()
    const mutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => {
            return userService
                .logout()
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: (r) => {
            router.push('/')
            toast.success('Anda berhasil keluar')
        },
        onError: (e: any) => {
            toast.error(e.response.data.error.message || 'Anda gagal keluar')
        },
    });

    return mutation;
}

export default useLogout