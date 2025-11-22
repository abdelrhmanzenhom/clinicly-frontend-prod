import { Loader } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader className="animate-spin w-10 h-10" />
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="flex justify-center items-center py-20 text-red-500">
      Something went wrong while fetching appointments.
    </div>
  );
}
