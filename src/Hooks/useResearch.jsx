import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const apiUrl = import.meta.env.VITE_APILINK;
const useResearch = () => {
  const { loading } = useAuth();
  const {
    data: ResearchInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["ResearchInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/research`);
      return res.json();
    },
  });
  return [ResearchInfo, refetch, dataLoading];
};

export default useResearch;
