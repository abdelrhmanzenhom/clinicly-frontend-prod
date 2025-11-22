import { useQuery } from "@tanstack/react-query";
import { getReceptionistDashboard } from "../Api/Services/receptionistService.js";

export const useReceptionistDashboard = () => {
    return useQuery({
        queryKey: ["receptionist-dashboard"],
        queryFn: getReceptionistDashboard,
        refetchInterval: 30_000, // auto refresh every 30s
    });
};

