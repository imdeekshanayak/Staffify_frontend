import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getLeaves } from "../services/leave";
import LeaveTable from "../components/LeaveTable";

const LEAVE_LIMITS = {
  Paid: 12,
  Sick: 6,
  Casual: 6,
};

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] = useState({
    leaveType: "Paid",
    fromDate: "",
    toDate: "",
    reason: "",
    medicalCertificate: null,
  });

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await getLeaves();
        setLeaves(data);
      } catch {
        setError("Unable to load leave requests");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  /* ---------- Calculations ---------- */
  const appliedCounts = useMemo(() => {
    return leaves.reduce(
      (acc, leave) => {
        acc[leave.leaveType] += leave.days || 1;
        return acc;
      },
      { Paid: 0, Sick: 0, Casual: 0 }
    );
  }, [leaves]);

  const balanceCounts = {
    Paid: LEAVE_LIMITS.Paid - appliedCounts.Paid,
    Sick: LEAVE_LIMITS.Sick - appliedCounts.Sick,
    Casual: LEAVE_LIMITS.Casual - appliedCounts.Casual,
  };

  const filteredLeaves = useMemo(() => {
    if (statusFilter === "All") return leaves;
    return leaves.filter((l) => l.status === statusFilter);
  }, [leaves, statusFilter]);

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const isFormInvalid =
    !formData.fromDate ||
    !formData.toDate ||
    formData.fromDate > formData.toDate ||
    (formData.leaveType === "Sick" && !formData.medicalCertificate);

  const handleApplyLeave = () => {
    const newLeave = {
      id: Date.now(),
      employeeName: "You",
      status: "Pending",
      leaveType: formData.leaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason,
      medicalCertificate: formData.medicalCertificate
        ? formData.medicalCertificate.name
        : null,
    };

    setLeaves((prev) => [newLeave, ...prev]);
    setShowForm(false);
    setFormData({
      leaveType: "Paid",
      fromDate: "",
      toDate: "",
      reason: "",
      medicalCertificate: null,
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Leave Management
          </h1>
          <p className="text-sm text-gray-500">
            Apply, track, and manage your leaves
          </p>
        </div>

        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
        >
          {showForm ? "Close" : "Apply Leave"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.keys(LEAVE_LIMITS).map((type) => (
          <LeaveSummaryCard
            key={type}
            type={type}
            total={LEAVE_LIMITS[type]}
            used={appliedCounts[type]}
            balance={balanceCounts[type]}
          />
        ))}
      </div>

      {/* Apply Leave Form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-5">Apply Leave</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="Paid">Paid Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
            </select>

            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {formData.leaveType === "Sick" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Medical Certificate
              </label>
              <input
                type="file"
                name="medicalCertificate"
                accept=".pdf,.jpg,.png"
                onChange={handleChange}
                className="border rounded-md px-3 py-2 text-sm w-full"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="border px-4 py-2 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              disabled={isFormInvalid}
              onClick={handleApplyLeave}
              className={`px-4 py-2 rounded-md text-sm text-white ${
                isFormInvalid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Filter + Table */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Leave History
        </h2>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading && <p>Loading leave requests...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <LeaveTable leaves={filteredLeaves} />}
    </DashboardLayout>
  );
}

export default Leaves;

/* ---------- Summary Card ---------- */
function LeaveSummaryCard({ type, total, used, balance }) {
  const percentage = Math.min((used / total) * 100, 100);

  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm font-medium text-gray-500 mb-1">
        {type} Leave
      </p>
      <p className="text-2xl font-semibold text-gray-800">
        {balance} left
      </p>

      <div className="mt-3">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {used} used of {total}
        </p>
      </div>
    </div>
  );
}
