import FormTitle from "./FormTitle";
import { useQuery } from "@tanstack/react-query";
import { getAvailableSlots } from "../../../Api/Services/appointmentService";

export default function DoctorTime({
  doctor,
  date,
  chosenTime,
  setChosenTime,
}) {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [`${doctor?._id}_${date}`],
    queryFn: () => getAvailableSlots(doctor?._id, date),
    staleTime: 1000 * 60 * 5, // network request after 5 minutes
  });

  console.log(data);

  if (isLoading) return "Loading Time Slots...";
  if (isError) return "Error Loading Time Slots";

  if (isSuccess) {
    const { slots } = data;

    return (
      <div className="mt-8 px-8">
        <FormTitle text="Step 6: Select a time" />
        <div className="flex flex-col">
          {slots.map((slot) => {
            return (
              <label
                key={slot.time}
                className="flex items-center my-2 gap-4 rounded-lg border border-solid border-[#dbdfe6] p-[15px] has-[input:disabled]:opacity-50"
              >
                <input
                  type="radio"
                  name="time"
                  value={slot}
                  onChange={(e) => {
                    setChosenTime(slot);
                  }}
                  checked={chosenTime?.time === slot.time}
                  disabled={!slot.available}
                />
                <div className="flex grow flex-col">
                  <p className="text-[#111318] text-sm font-medium leading-norma">
                    {slot.time}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  return "No time slots available";
}
