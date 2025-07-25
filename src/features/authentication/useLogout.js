import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      //remove all queries from cache

      queryClient.removeQueries();
      //replce is use to replace current entry in the browser
      //so user dont go back to the previous page by the back button
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
