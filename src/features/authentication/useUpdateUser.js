import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    isLoading: isUpdating,
    error,
    mutate: updateUser,
  } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account is successfully updated.");
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({
      //  queryKey: ["user"],
      //});
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, error, isUpdating };
}
