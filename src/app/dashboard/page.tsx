import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to the audit page since the dashboard is now integrated into the landing page
  redirect('/dashboard/audit');
}
