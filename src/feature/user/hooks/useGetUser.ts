import userService from '@/services/user';
import { useQuery } from '@tanstack/react-query';

const useGetUser = () => {
    const query = useQuery({
        queryKey: ['get-user'],
        queryFn: () => userService.get(),
    });

    return query
}

export default useGetUser