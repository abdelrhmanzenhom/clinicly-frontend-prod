export default function StatusBadge({ status }) {
  const colors = {
    pending: "badge-warning",
    confirmed: "badge-primary",
    arrived: "badge-info",
    "in-session": "badge-accent",
    completed: "badge-success",
    canceled: "badge-error",
  };

  return (
    <span className={`badge ${colors[status] || "badge-ghost"} capitalize`}>
      {status}
    </span>
  );
}
