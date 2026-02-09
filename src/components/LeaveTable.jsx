function LeaveTable({ leaves }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Employee</th>
            <th className="px-6 py-3 text-left">Leave Type</th>
            <th className="px-6 py-3 text-left">From</th>
            <th className="px-6 py-3 text-left">To</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {leaves.map((leave) => (
            <tr key={leave.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">
                {leave.employeeName}
              </td>
              <td className="px-6 py-4">
                {leave.leaveType}
              </td>
              <td className="px-6 py-4">
                {leave.fromDate}
              </td>
              <td className="px-6 py-4">
                {leave.toDate}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveTable;
