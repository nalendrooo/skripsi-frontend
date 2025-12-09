import itemService from '@/services/item';
import { useQuery } from '@tanstack/react-query';

const useGetItem = () => {
    const query = useQuery({
        queryKey: ['get-item'],
        queryFn: () => itemService.get({ active: true, perPage: 9999 }),
    });

    return query
}

export default useGetItem