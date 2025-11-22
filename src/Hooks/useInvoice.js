import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInvoice,
  getInvoiceById,
  getInvoices,
  updateInvoice,
} from "../Api/Services/billingService";

// ================== GET ALL INVOICES ==================
export const useInvoices = (filters = {}) => {
  return useQuery({
    queryKey: ["invoices", filters],
    queryFn: () => getInvoices(filters),
  });
};

// ================== GET SINGLE INVOICE ==================
export const useInvoice = (id) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id, // only runs if id exists
  });
};

// ================== CREATE INVOICE ==================
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};

// ================== UPDATE INVOICE ==================
export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateInvoice(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
