import History from "@/components/History";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPopularImages } from "@/utils/action";

const HistoryPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["popularImages"],
    queryFn: () => getPopularImages({ pageParam: 1, searchTerm: null }),
    initialPageParam: 1,

    getNextPageParam: (
      lastPage: { total_pages: number },
      pages: string | any[]
    ) => {
      if (pages.length < lastPage.total_pages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    pages: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <History />
    </HydrationBoundary>
  );
};

export default HistoryPage;
