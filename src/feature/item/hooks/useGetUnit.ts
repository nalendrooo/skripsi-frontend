import unitService from '@/services/unit';
import { useQuery } from '@tanstack/react-query';

const useGetUnit = () => {
    const query = useQuery({
        queryKey: ['get-unit'],
        queryFn: () => unitService.get({ perPage: 9999 }),
    });

    return query
}

export default useGetUnit