import dashboardService from '@/services/dashboard';
import userService from '@/services/user';
import { useQuery } from '@tanstack/react-query';

const useGetDashboard = () => {
    const query = useQuery({
        queryKey: ['get-dashboard'],
        queryFn: () => dashboardService.get()
    });

    return query
}

export default useGetDashboard