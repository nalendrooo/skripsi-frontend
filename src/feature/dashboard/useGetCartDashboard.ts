import dashboardService from '@/services/dashboard';
import { useQuery } from '@tanstack/react-query';

const useGetCartDashboard = () => {
    const query = useQuery({
        queryKey: ['get-cart-dashboard'],
        queryFn: () => dashboardService.getCart()
    });

    return query
}

export default useGetCartDashboard