import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { checkAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Admin — A Star Number Plates",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gate = await checkAdmin();
  const email = gate.ok ? gate.email : null;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-[var(--brand-cream)] md:flex-row">
      <AdminSidebar adminEmail={email} />
      <div className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</div>
    </div>
  );
}
