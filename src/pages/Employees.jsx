import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeTable from "../components/EmployeeTable";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employee";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    name: "",
    email: "",
    designation: "",
    department: "",
    dateOfJoining: "",
    isActive: "",
  };

  const [formData, setFormData] = useState(initialForm);

  // 🔹 Fetch Employees
  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Save
  const handleSave = async () => {
    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
      } else {
        await createEmployee(formData);
      }

      await fetchEmployees();
      setShowForm(false);
      setEditingId(null);
      setFormData(initialForm);
    } catch (err) {
      setError("Failed to save employee");
    }
  };

  // 🔹 Edit
  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.employeeId);   // 🔥 important
    setShowForm(true);
  };

  // 🔹 Delete
  const handleDelete = async (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await deleteEmployee(employeeId);
      await fetchEmployees();
    } catch (err) {
      setError("Failed to delete employee");
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Employee Directory</h1>
          <p className="text-sm text-gray-500">
            Manage all employees in Staffify
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData(initialForm);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700"
        >
          + Add Employee
        </button>
      </div>

      {loading && <p>Loading employees...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* ✅ Only ONE table */}
      {!loading && !error && (
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Employee" : "Add Employee"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />

            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />

            <input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />

            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />

            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Employees;
