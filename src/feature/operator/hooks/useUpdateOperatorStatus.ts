// hooks/useUpdateUserStatus.ts
import { IDataUser } from '@/model/user'
import operatorService from '@/services/operator'
import userService from '@/services/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

const useUpdateOperatorStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        // mutationFn: async ({ userId, isActive }: { userId: number, isActive: boolean }) => {
        //   await axios.patch(`/api/users/${userId}`, { isActive })
        // },
        mutationFn: ({ operatorId, isActive }: { operatorId: number, isActive: boolean }) => {
            return operatorService
                .updateStatus({
                    id: operatorId,
                    body: {
                        isActive
                    },
                })
                .then((response: AxiosResponse) => response.data);
        },
        // onMutate: async ({ userId, isActive }) => {
          
        //     await queryClient.cancelQueries({ queryKey: ['get-user'] })

        //     const previousData = queryClient.getQueryData<{ data: { data: IDataUser[] } }>(['get-user'])

        //     queryClient.setQueryData(['get-user'], (old: typeof previousData) => {
        //         if (!old) return old
        //         return {
        //             ...old,
        //             data: {
        //                 ...old.data,
        //                 data: old.data.data.map(user =>
        //                     user.id === userId ? { ...user, isActive } : user
        //                 )
        //             }
        //         }
        //     })

        //     return { previousData }
        // },
        // onError: (_err, _variables, context) => {
        //     if (context?.previousData) {
        //         queryClient.setQueryData(['get-user'], context.previousData)
        //     }
        // },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['get-operator'] })
        }
    })
}

export default useUpdateOperatorStatus
