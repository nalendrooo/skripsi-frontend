import itemService from '@/services/item';
import operatorService from '@/services/operator';
import { useQuery } from '@tanstack/react-query';

const useGetOperator = () => {
    const query = useQuery({
        queryKey: ['get-operator'],
        queryFn: () => operatorService.get(),
    });

    return query
}

export default useGetOperator 