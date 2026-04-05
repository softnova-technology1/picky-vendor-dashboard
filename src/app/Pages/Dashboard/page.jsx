import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import DashboardContent from "../../../components/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="dashboardLayout">
      <Sidebar />

      <div className="dashboardMain">
        <Navbar />
        <DashboardContent />
      </div>
    </div>
  );
}
