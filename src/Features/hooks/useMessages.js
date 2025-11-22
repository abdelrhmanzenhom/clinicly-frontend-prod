import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMessages,
  getRecentMessages,
  getMessageById,
  getPatientMessages,
  sendMessage,
  markMessageAsRead,
  deleteMessage,
} from "../../Api/Services/messages";

// Hook to get all messages
export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getAllMessages,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404
      if (error?.message?.includes("404")) return false;
      return failureCount < 2;
    },
    select: (data) => {
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
  });
};

// Hook to get recent messages
export const useRecentMessages = (limit = 5) => {
  return useQuery({
    queryKey: ["messages", "recent", limit],
    queryFn: () => getRecentMessages(limit),
    staleTime: 1 * 60 * 1000, // 1 minute for recent messages
    retry: (failureCount, error) => {
      if (error?.message?.includes("404")) return false;
      return failureCount < 2;
    },
    select: (data) => {
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
  });
};

// Hook to get messages for a specific patient
export const usePatientMessages = (patientId) => {
  return useQuery({
    queryKey: ["messages", "patient", patientId],
    queryFn: () => getPatientMessages(patientId),
    enabled: !!patientId, // Only run if patientId exists
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error?.message?.includes("404")) return false;
      return failureCount < 2;
    },
  });
};

// Hook to get single message by ID
export const useMessage = (id) => {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessageById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to send a message
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      // Invalidate all message queries to refetch
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
    },
  });
};

// Hook to mark message as read
export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: (data, messageId) => {
      // Update the specific message in cache
      queryClient.setQueryData(["messages", messageId], data);
      // Invalidate messages list to refetch
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Failed to mark message as read:", error);
    },
  });
};

// Hook to delete a message
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Failed to delete message:", error);
    },
  });
};
