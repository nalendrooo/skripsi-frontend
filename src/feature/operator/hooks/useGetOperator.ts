import operatorService from '@/services/operator';
import { useQuery } from '@tanstack/react-query';

const useGetOperator = () => {
    const query = useQuery({
        queryKey: ['get-operator'],
        queryFn: () => operatorService.get({ perPage: 9999 }),
    });

    return query
}

export default useGetOperator 