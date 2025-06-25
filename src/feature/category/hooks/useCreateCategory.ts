import { IBodyTitleModel } from '@/model/_global';
import categoryService from '@/services/category';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useGetCategory from './useGetCategory';
import { toast } from 'sonner';

interface IMutationVariables {
    body: IBodyTitleModel
}

const useCreateCategory = () => {
    const { refetch } = useGetCategory()
    const mutation = useMutation({
        mutationKey: ['create-category'],
        mutationFn: ({ body }: IMutationVariables) => {
            return categoryService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Category berhasil ditambahkan')
            refetch()
        },
        onError: () => {
            toast.error('Category gagal ditambahkan')
        },
    });

    return mutation;
}

export default useCreateCategory