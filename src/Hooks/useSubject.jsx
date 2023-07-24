import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const apiUrl = import.meta.env.VITE_APILINK;
const useSubject = (collegeId) => {
    const { loading } = useAuth();
    const {
        data: SubjectInfo = [],
        isLoading: dataLoading,
        refetch,
    } = useQuery({
        queryKey: ["SubjectInfo"],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`${apiUrl}/subjects/${collegeId}`);
            return res.json();
        },
    });
    return [SubjectInfo, refetch, dataLoading];
};

export default useSubject;
