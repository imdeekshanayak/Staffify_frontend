import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from "../services/leave";
import LeaveTable from "../components/LeaveTable";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const initialForm = {
    leaveType: "Paid",
    fromDate: "",
    toDate: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialForm);

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

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyLeave = async () => {
    try {
      await createLeave({
        ...formData,
        status: "Pending",
      });

      await fetchLeaves();
      setShowForm(false);
      setFormData(initialForm);
    } catch {
      setError("Failed to apply leave");
    }
  };

  const handleApprove = async (leave) => {
    await updateLeave(leave._id || leave.id, {
      ...leave,
      status: "Approved",
    });
    fetchLeaves();
  };

  const handleReject = async (leave) => {
    await updateLeave(leave._id || leave.id, {
      ...leave,
      status: "Rejected",
    });
    fetchLeaves();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this leave request?")) return;
    await deleteLeave(id);
    fetchLeaves();
  };

  return (
    <DashboardLayout>
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

      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Apply Leave</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
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
              className="bg-purple-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {loading && <p>Loading leave requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <LeaveTable
          leaves={leaves}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
}

export default Leaves;
