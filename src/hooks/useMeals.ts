import { useQuery } from '@tanstack/react-query'
import { fetchMeals } from '@/services/meals'

export const useMeals = () => {
    return useQuery({
        queryKey: ['meals'],
        queryFn: () => fetchMeals(),
        staleTime: 5 * 60 * 1000
    })
}