import { IBodyTitleModel } from '@/model/_global';
import categoryService from '@/services/category';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useGetCategory from './useGetCategory';
import { toast } from 'sonner';

interface IMutationVariables {
    body: IBodyTitleModel
    id: number
}

const useUpdateCategory = () => {
    const { refetch } = useGetCategory()
    const mutation = useMutation({
        mutationKey: ['update-category'],
        mutationFn: ({ body, id }: IMutationVariables) => {
            return categoryService
                .update({
                    body,
                    id
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Category berhasil diubah')
            refetch()
        },
        onError: () => {
            toast.error('Category gagal diubah')
        },
    });

    return mutation;
}

export default useUpdateCategory