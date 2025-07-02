import { IBodyCreateOperatorModel, IBodyUpdateOperatorModel } from '@/model/user';
import operatorService from '@/services/operator';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import useGetOperator from './useGetOperator';

interface IMutationVariables {
    body: IBodyUpdateOperatorModel
    id: number
}

const useUpdateOperator = () => {
    const { refetch } = useGetOperator()
    const mutation = useMutation({
        mutationKey: ['update-operator'],
        mutationFn: ({ body, id }: IMutationVariables) => {
            return operatorService
                .update({
                    body,
                    id
                })
                .then((response: AxiosResponse) => response.data);
        },
        onSuccess: () => {
            toast.success('Operator berhasil diupdate')
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error?.message || 'Operator gagal diupdate')
        },
    });

    return mutation;
}

export default useUpdateOperator