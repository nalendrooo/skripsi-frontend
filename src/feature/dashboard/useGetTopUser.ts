import userService from '@/services/user';
import { useQuery } from '@tanstack/react-query';

const useGetTopUser = () => {
    const query = useQuery({
        queryKey: ['get-top-user'],
        queryFn: () => userService.getTop(),
    });

    return query
}

export default useGetTopUser