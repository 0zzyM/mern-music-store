import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "../api/promotions";

export const usePromotions = () =>
  useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
    staleTime: Infinity, // I believe no need for re-fecth when there is a change in BE need to purge the cache tho
    //TODO: Manage above when cache and local storage is implemented
  });
