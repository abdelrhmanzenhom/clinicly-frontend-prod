import { useEffect, useState } from "react";

export default function MyAppointments() {
  const patientId = "691ae6af6298f1f29d11f9d0";

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholderAppointments = [
    { _id: "1", doctor: { name: "Dr. Ahmed Hassan" }, date: new Date().toISOString().slice(0, 10), time: "10:30 AM", status: "Completed" },
    { _id: "2", doctor: { name: "Dr. Sarah Mahmoud" }, date: new Date().toISOString().slice(0, 10), time: "02:00 PM", status: "Cancelled" },
    { _id: "3", doctor: { name: "Dr. Nour Adel" }, date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10), time: "11:00 AM", status: "Upcoming" },
    { _id: "4", doctor: { name: "Dr. Mohamed Ali" }, date: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10), time: "01:00 PM", status: "Upcoming" },
    { _id: "5", doctor: { name: "Dr. Hany Saad" }, date: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10), time: "03:00 PM", status: "Completed" },
    { _id: "6", doctor: { name: "Dr. Heba Kamal" }, date: new Date(Date.now() - 10 * 86400000).toISOString().slice(0, 10), time: "09:00 AM", status: "Cancelled" },
  ];

  const statusColors = {
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-rose-100 text-rose-700",
    Upcoming: "bg-blue-100 text-blue-700",
  };

  const statusIcons = {
    Completed: "✔️",
    Cancelled: "✖️",
    Upcoming: "⏳",
  };

  const sectionIcons = {
    "Today's Appointments": "📅",
    "Upcoming Appointments": "⏳",
    "Past Appointments": "📘",
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        const data = placeholderAppointments;

        const today = new Date();
        const todayString = today.toDateString();

        setTodayAppointments(data.filter(a => new Date(a.date).toDateString() === todayString));
        setPastAppointments(data.filter(a => new Date(a.date) < new Date(todayString)));
        setUpcomingAppointments(data.filter(a => new Date(a.date) > new Date(todayString)));

      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="p-6 text-center text-lg">Loading...</p>;

  const Card = ({ a }) => (
    <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-white-300 via-blue-100 to-blue-100 shadow-lg">

      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        {/* Doctor Name */}
        <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
          👨‍⚕️ {a.doctor?.name}
        </p>

        {/* Date & Time */}
        <div className="mt-4 flex items-center gap-6 text-gray-700 font-medium">
          <p className="flex items-center gap-1">
            📆 {a.date}
          </p>
          <p className="flex items-center gap-1">
            ⏰ {a.time}
          </p>
        </div>

        {/* Status */}
        <span
          className={`mt-5 inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ${statusColors[a.status]}`}
        >
          {statusIcons[a.status]} {a.status}
        </span>

      </div>
    </div>
  );

  return (
<div className="p-4 sm:p-6 space-y-10 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">

      <Section title="Today's Appointments" list={todayAppointments} card={Card} empty="No appointments today." icon={sectionIcons["Today's Appointments"]} />

      <Section title="Upcoming Appointments" list={upcomingAppointments} card={Card} empty="No upcoming appointments." icon={sectionIcons["Upcoming Appointments"]} />

      <Section title="Past Appointments" list={pastAppointments} card={Card} empty="You have no past appointments." icon={sectionIcons["Past Appointments"]} />

    </div>
  );
}

function Section({ title, list, card: Card, empty, icon }) {
  return (
    <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">

      <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center flex items-center justify-center gap-2">
        <span className="text-3xl">{icon}</span> {title}
      </h2>

      {list.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {list.map(a => <Card key={a._id} a={a} />)}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-3">{empty}</p>
      )}

    </div>
  );
}
