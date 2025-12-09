import itemBalanceService from '@/services/item-balance';
import { useQuery } from '@tanstack/react-query';

const useGetItemBalance = () => {
    const query = useQuery({
        queryKey: ['get-item-balance'],
        queryFn: () => itemBalanceService.get({ perPage: 9999 }),
    });

    return query
}

export default useGetItemBalance