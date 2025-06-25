import itemService from '@/services/item';
import itemBalanceService from '@/services/item-balance';
import itemOutService from '@/services/item-out';
import { useQuery } from '@tanstack/react-query';

const useGetItemBalance = () => {
    const query = useQuery({
        queryKey: ['get-item-balance'],
        queryFn: () => itemBalanceService.get(),
    });

    return query
}

export default useGetItemBalance