import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const apiUrl = import.meta.env.VITE_APILINK;
const useAdmission = () => {
  const { loading } = useAuth();
  const {
    data: AdmissionInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["AdmissionInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/admission`);
      return res.json();
    },
  });
  return [AdmissionInfo, refetch, dataLoading];
};

export default useAdmission;
