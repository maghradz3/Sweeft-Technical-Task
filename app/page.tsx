import Loading from "@/components/Loading";
import Main from "@/components/Main";
import { getPopularImages } from "@/utils/action";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function HomePage() {
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
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Main />
      </HydrationBoundary>
    </Suspense>
  );
}
