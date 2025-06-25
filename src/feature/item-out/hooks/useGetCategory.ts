import categoryService from '@/services/category';
import { useQuery } from '@tanstack/react-query';

const useGetCategory = () => {
    const query = useQuery({
        queryKey: ['get-category'],
        queryFn: () => categoryService.get(),
    });

    return query
}

export default useGetCategory