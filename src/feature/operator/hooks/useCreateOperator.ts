import { IBodyCreateOperatorModel } from '@/model/user';
import operatorService from '@/services/operator';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetOperator from './useGetOperator';

interface IMutationVariables {
    body: IBodyCreateOperatorModel
}

const useCreateOperator = () => {
    const { refetch } = useGetOperator()
    const mutation = useMutation({
        mutationKey: ['create-operator'],
        mutationFn: ({ body }: IMutationVariables) => {
            return operatorService
                .create({
                    body,
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Operator berhasil ditambahkan')
            refetch()
        },
        onError: () => {
            toast.error('Operator gagal ditambahkan')
        },
    });

    return mutation;
}

export default useCreateOperator