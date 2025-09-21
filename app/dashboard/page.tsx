
import DashboardContent from "./dashboard-content";

export default function DashboardPage() {
  // Loads dashboard for any user, no authentication required
  return <DashboardContent user={null} userData={null} />;
}
