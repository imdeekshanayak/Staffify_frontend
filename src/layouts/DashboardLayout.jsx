import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({children}){
    return (
        <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
    )
}

export default DashboardLayout;