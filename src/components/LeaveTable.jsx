function LeaveTable({ leaves, onApprove, onReject, onDelete }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Employee</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">From</th>
            <th className="px-6 py-3 text-left">To</th>
            <th className="px-6 py-3 text-left">Reason</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                No leave requests found
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave._id || leave.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{leave.employeeName}</td>
                <td className="px-6 py-4">{leave.leaveType}</td>
                <td className="px-6 py-4">{leave.fromDate}</td>
                <td className="px-6 py-4">{leave.toDate}</td>
                <td className="px-6 py-4">{leave.reason}</td>

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

                <td className="px-6 py-4 space-x-2">
                  {leave.status === "Pending" && (
                    <>
                      <button
                        onClick={() => onApprove(leave)}
                        className="text-green-600 text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(leave)}
                        className="text-red-600 text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => onDelete(leave._id || leave.id)}
                    className="text-gray-500 text-xs"
                  >
                    Delete
                  </button>
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
