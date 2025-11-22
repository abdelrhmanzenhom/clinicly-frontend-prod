
import { useQuery } from "@tanstack/react-query";
import { getAllPatients, getPatientById } from "../../Api/Services/patients";

export const usePatients = (filters = {}) => {
  return useQuery({
    queryKey: ["patients", filters],
    queryFn: () => getAllPatients(filters),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const usePatient = (id) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
