import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="dashboardLayout">
      <Sidebar />

      <div className="dashboardMain">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
