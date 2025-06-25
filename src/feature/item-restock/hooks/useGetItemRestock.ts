import itemRestockService from '@/services/item-restock';
import { useQuery } from '@tanstack/react-query';

const useGetItemRestock = () => {
    const query = useQuery({
        queryKey: ['get-item-restock'],
        queryFn: () => itemRestockService.get(),
    });

    return query
}

export default useGetItemRestock