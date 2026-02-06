function EmployeeTable({employees}){
  
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Designation</th>
            <th className="px-6 py-3 text-left">Department</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">
                {emp.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {emp.email}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {emp.designation}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {emp.department}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
