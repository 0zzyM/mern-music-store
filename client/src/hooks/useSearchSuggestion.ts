import { useQuery } from "@tanstack/react-query";
import { getSearchSuggestions } from "../api/search";

export const useSearchSuggestion = (q: string) =>
  useQuery({
    queryKey: ["suggestions", q],
    queryFn: () => getSearchSuggestions(q),
    staleTime: 30 * 1000,
    enabled: q.length >= 2,
    retry: 1,
  });
