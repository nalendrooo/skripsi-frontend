import itemService from '@/services/item';
import itemOutService from '@/services/item-out';
import { useQuery } from '@tanstack/react-query';

const useGetItemOut = () => {
    const query = useQuery({
        queryKey: ['get-item-out'],
        queryFn: () => itemOutService.get(),
    });

    return query
}

export default useGetItemOut