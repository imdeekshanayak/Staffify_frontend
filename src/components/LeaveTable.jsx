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
            <th className="px-6 py-3 text-left">Medical Certificate</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {leaves.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-10 text-center text-gray-500"
              >
                No leave requests found
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {leave.employeeName}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {leave.leaveType}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {leave.fromDate}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {leave.toDate}
                </td>

                <td className="px-6 py-4">
                  {leave.leaveType === "Sick" ? (
                    leave.medicalCertificate ? (
                      <span className="text-green-600 font-medium">
                        Uploaded
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Missing
                      </span>
                    )
                  ) : (
                    <span className="text-gray-400">
                      Not Required
                    </span>
                  )}
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveTable;
