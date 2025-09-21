
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Onboarding from "./onboarding";
import DashboardContent from "./dashboard-content";
import MoodCheck from "./mood-check";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/auth/signin");
  }
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    redirect("/auth/signin");
  }
  if (!user.onboardingComplete) {
    return <Onboarding userId={user.id} />;
  }
  const userData = await prisma.userData.findUnique({ where: { userId: user.id } });
  // Show mood check if lastMoodCheck is more than 24 hours ago
  const now = new Date();
  const lastCheck = userData?.lastMoodCheck ? new Date(userData.lastMoodCheck) : null;
  const needsMoodCheck = !lastCheck || (now.getTime() - lastCheck.getTime()) > 24 * 60 * 60 * 1000;
  if (needsMoodCheck) {
    return <MoodCheck userId={user.id} />;
  }
  return <DashboardContent user={user} userData={userData} />;
}
