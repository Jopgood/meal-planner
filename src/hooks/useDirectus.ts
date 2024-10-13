import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { fetchData, createItem, updateItem, deleteItem } from "@/lib/api";

// Define a more flexible generic type for the query result
type QueryResult<T> = UseQueryResult<T, Error>;

// Define more flexible types for mutation results
type CreateMutationResult<T> = UseMutationResult<
  any,
  Error,
  Partial<T>,
  unknown
>;
type UpdateMutationResult<T> = UseMutationResult<
  any,
  Error,
  { id: string; item: Partial<T> },
  unknown
>;
type DeleteMutationResult = UseMutationResult<any, Error, string, unknown>;

export function useDirectusQuery<T = any>(
  resource: string,
  query: any = {}
): QueryResult<T> {
  return useQuery<T, Error>({
    queryKey: [resource, query],
    queryFn: () => fetchData(resource, query) as Promise<T>,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDirectusMutation<T = any>(resource: string) {
  const queryClient = useQueryClient();

  const create: CreateMutationResult<T> = useMutation({
    mutationFn: (item: Partial<T>) => createItem(resource, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });

  const update: UpdateMutationResult<T> = useMutation({
    mutationFn: ({ id, item }: { id: string; item: Partial<T> }) =>
      updateItem(resource, id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });

  const remove: DeleteMutationResult = useMutation({
    mutationFn: (id: string) => deleteItem(resource, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });

  return { create, update, remove };
}
