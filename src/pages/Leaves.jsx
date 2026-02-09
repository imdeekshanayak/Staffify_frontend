import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getLeaves } from "../services/leave";
import LeaveTable from "../components/LeaveTable";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await getLeaves();
        setLeaves(data);
      } catch (err) {
        setError("Unable to load leave requests");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Leave Management
        </h1>
        <p className="text-sm text-gray-500">
          Review and manage employee leave requests
        </p>
      </div>

      {loading && <p>Loading leave requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <LeaveTable leaves={leaves} />
      )}
    </DashboardLayout>
  );
}

export default Leaves;
