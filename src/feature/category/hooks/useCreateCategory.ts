import { IBodyCategoryModel } from '@/model/category';
import categoryService from '@/services/category';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface IMutationVariables {
    body: IBodyCategoryModel
}

const useCreateCategory = () => {
    const mutation = useMutation({
        mutationKey: ['create-category'],
        mutationFn: ({ body }: IMutationVariables) => {
            return categoryService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
    });

    return mutation;
}

export default useCreateCategory