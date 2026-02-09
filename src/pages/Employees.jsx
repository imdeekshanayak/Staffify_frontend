import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getEmployees } from "../services/employee";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    department: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch {
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const newEmployee = {
      id: Date.now(), // temporary (API will replace later)
      ...formData,
    };

    setEmployees((prev) => [...prev, newEmployee]);
    setShowForm(false);
    setFormData({ name: "", email: "", designation: "", department: "" });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Employee Directory
          </h1>
          <p className="text-sm text-gray-500">
            View and manage all employees in your organization
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
        >
          + Add Employee
        </button>
      </div>

      {/* States */}
      {loading && <p>Loading employees...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Add Employee Form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            />

            <input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Save Employee
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <EmployeeTable employees={employees} />
      )}
    </DashboardLayout>
  );
}

export default Employees;
