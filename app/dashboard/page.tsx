
import DashboardContent from "./dashboard-content";

export default function DashboardPage() {
  // Provide mock user and userData for demo personalization
  const mockUser = {
    name: "Demo User",
    email: "demo@mindspace.com"
  };
  const mockUserData = {
    wellnessScore: 85,
    streakDays: 7,
    todayGoals: JSON.stringify([
      { id: 1, title: "Practice deep breathing", completed: true },
      { id: 2, title: "Get 8 hours of sleep", completed: false },
      { id: 3, title: "Journal for 10 minutes", completed: false },
      { id: 4, title: "Take a mindful walk", completed: true }
    ]),
    recentActivities: JSON.stringify([
      { type: "chat", title: "Chatted with AI Companion", time: "Today, 9:00 AM" },
      { type: "sleep", title: "Completed Sleep Coach", time: "Yesterday, 10:00 PM" },
      { type: "coaching", title: "Micro-Coaching: Stress Relief", time: "Yesterday, 5:00 PM" }
    ])
  };
  return <DashboardContent user={mockUser} userData={mockUserData} />;
}
