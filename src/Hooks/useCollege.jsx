import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { SearchContext } from "../Providers/SearchProvider";
import { useContext } from "react";

const apiUrl = import.meta.env.VITE_APILINK;
const useCollege = () => {
  const { loading } = useAuth();
  const { searchText } = useContext(SearchContext);
  const {
    data: CollegeInfo = [],
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["CollegeInfo"],
    enabled: !loading,
    queryFn: async () => {
      if(searchText== null || searchText ==""){
        const res = await fetch(`${apiUrl}/college`);
        return res.json();
      } else{
        const res = await fetch(`${apiUrl}/college/${searchText}`);
        return res.json();
      }
    },
  });
  return [CollegeInfo, refetch, dataLoading];
};

export default useCollege;
