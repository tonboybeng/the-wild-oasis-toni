import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // 1. Filter
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };
  // {
  //   field: "totalPrice",
  //   value: 5000,
  //   method: "gte",
  // };

  // 2. Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // 3. Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  console.log("data", data);

  // 4. Prefetch query
  let pageCount;

  if (data) {
    pageCount = Math.ceil(data.count / PAGE_SIZE);

    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      });
    }
  }

  return { isLoading, error, data };
}
