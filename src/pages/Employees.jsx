import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getEmployees } from "../services/employee";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Employee Directory
        </h1>
        <p className="text-sm text-gray-500">
          View and manage all employees in your organization
        </p>
      </div>

      {loading && <p>Loading employees...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <EmployeeTable employees={employees} />
      )}
    </DashboardLayout>
  );
}

export default Employees;
