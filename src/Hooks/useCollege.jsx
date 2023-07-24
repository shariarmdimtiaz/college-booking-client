import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const apiUrl = import.meta.env.VITE_APILINK;
const useCollege = () => {
  const { loading } = useAuth();
  const {
    data: CollegeInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["CollegeInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/college`);
      return res.json();
    },
  });
  return [CollegeInfo, refetch, dataLoading];
};

export default useCollege;
