import itemOutService from '@/services/item-out';
import { useQuery } from '@tanstack/react-query';

const useGetItemOut = () => {
    const query = useQuery({
        queryKey: ['get-item-out'],
        queryFn: () => itemOutService.get({ perPage: 9999 }),
    });

    return query
}

export default useGetItemOut