// src/Features/Admin/Pages/Patients.jsx
import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "../../../Api/Services/UserMangementService";

export default function Patients() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });
  const patients = data?.data || [];

  if (isLoading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;

  if (isError)
    return (
      <div className="text-center text-red-500 font-semibold">
        Failed to load patients.
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Gender</th>
            </tr>
          </thead>

        <tbody>
  {patients.map((p) => {
    const user = p.userId || {};
    return (
      <tr key={p._id} className="border-b hover:bg-gray-50">
        <td className="p-3">
          {user.firstName || user.lastName
            ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
            : '-'}
        </td>
        <td className="p-3">{user.email ?? '-'}</td>
        <td className="p-3">{user.phone ?? '-'}</td>
        <td className="p-3 capitalize">{p.gender ?? '-'}</td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>
    </div>
  );
}
