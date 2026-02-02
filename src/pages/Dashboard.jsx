import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard(){
    return (
        <DashboardLayout>
            <h2 className="text-2xl font-semibold mb-4">
        Welcome to Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          Total Employees
        </div>
        <div className="bg-white p-6 rounded shadow">
          Open Positions
        </div>
        <div className="bg-white p-6 rounded shadow">
          Applications
        </div>
      </div>
        </DashboardLayout>
    );
}
export default Dashboard;