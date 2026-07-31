import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../api/brands";

export const useBrands = (limit: number) =>
  useQuery({
    queryKey: ["brands", limit],
    queryFn: () => getBrands(limit),
    staleTime: Infinity, // changes after 28days  approximately
  });
