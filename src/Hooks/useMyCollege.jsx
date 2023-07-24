import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const apiUrl = import.meta.env.VITE_APILINK;
const useMyCollege = () => {
  const { user, loading } = useAuth();
  const {
    data: MyCollegeInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["MyCollegeInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/mycollege/${user.email}`);
      return res.json();
    },
  });
  return [MyCollegeInfo, refetch, dataLoading];
};

export default useMyCollege;
