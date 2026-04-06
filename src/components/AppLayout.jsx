import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AuthGuard from "./AuthGuard";

export default function AppLayout({ children }) {
  return (
    <AuthGuard>
      <div className="dashboardLayout">
        <Sidebar />

        <div className="dashboardMain">
          <Navbar />
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
