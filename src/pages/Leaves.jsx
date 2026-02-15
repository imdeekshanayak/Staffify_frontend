import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import {
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from "../services/leave";
import LeaveTable from "../components/LeaveTable";

/* ===============================
   Helper: derive display name from email
   e.g. "john.doe@company.com" → "John Doe"
=============================== */
const getNameFromEmail = (email) => {
  if (!email) return "User";
  const localPart = email.split("@")[0];
  return localPart
    .split(/[._-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

function Leaves() {
  const { user } = useAuth();

  // Derive a display name: prefer user.name, fallback to email-derived name
  const employeeName = user?.name || getNameFromEmail(user?.email);

  console.log("Logged In User:", user, "Display Name:", employeeName);

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const initialForm = {
    leaveType: "paid",
    fromDate: "",
    toDate: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialForm);

  /* =============================
     FETCH LEAVES
  ============================= */
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await getLeaves();

      // 🔥 Your backend returns { message, data }
      setLeaves(res.data || []);
    } catch (err) {
      setError("Unable to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  /* =============================
     INPUT HANDLER
  ============================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* =============================
     APPLY LEAVE
  ============================= */
  const handleApplyLeave = async () => {
    if (!user) return;

    try {
      setActionLoading(true);

      await createLeave({
        employeeId: user.userId,
        employeeName: employeeName,
        leaveType: formData.leaveType,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        reason: formData.reason,
      });

      await fetchLeaves();
      setShowForm(false);
      setFormData(initialForm);
    } catch {
      setError("Failed to apply leave");
    } finally {
      setActionLoading(false);
    }
  };

  /* =============================
     APPROVE
  ============================= */
  const handleApprove = async (leave) => {
    try {
      setActionLoading(true);
      await updateLeave(leave.leaveId, "Approved", employeeName);
      await fetchLeaves();
    } finally {
      setActionLoading(false);
    }
  };

  /* =============================
     REJECT
  ============================= */
  const handleReject = async (leave) => {
    try {
      setActionLoading(true);
      await updateLeave(leave.leaveId, "Rejected", employeeName);
      await fetchLeaves();
    } finally {
      setActionLoading(false);
    }
  };

  /* =============================
     DELETE
  ============================= */
  const handleDelete = async (leaveId) => {
    if (!window.confirm("Delete this leave request?")) return;

    try {
      setActionLoading(true);
      await deleteLeave(leaveId);
      await fetchLeaves();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Leave Management</h1>
          <p className="text-sm text-gray-500">
            Apply and manage leave requests
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
        >
          {showForm ? "Close" : "Apply Leave"}
        </button>
      </div>

      {/* APPLY FORM */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Apply Leave</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee Name (Auto Filled) */}
            <input
              value={employeeName}
              disabled
              className="border rounded-md px-3 py-2 bg-gray-100"
            />

            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            >
              <option value="paid">Paid Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="halfDay">Half Day</option>
            </select>

            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            />

            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            />

            <input
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="border px-4 py-2 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={handleApplyLeave}
              disabled={actionLoading}
              className="bg-purple-600 text-white px-4 py-2 rounded-md"
            >
              {actionLoading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading leave requests...</p>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {/* TABLE */}
      {!loading && !error && (
        <LeaveTable
          leaves={Array.isArray(leaves) ? leaves : []}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
}

export default Leaves;
