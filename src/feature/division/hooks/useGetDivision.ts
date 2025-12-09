import divisionService from '@/services/division';
import { useQuery } from '@tanstack/react-query';

const useGetDivision = () => {
    const query = useQuery({
        queryKey: ['get-division'],
        queryFn: () => divisionService.get({ perPage: 9999 }),
    });

    return query
}

export default useGetDivision