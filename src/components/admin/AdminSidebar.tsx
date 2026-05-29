import Link from "next/link";

interface AdminSidebarProps {
  adminEmail: string | null;
}

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminSidebar({ adminEmail }: AdminSidebarProps) {
  return (
    <aside className="flex flex-col gap-6 border-b border-neutral-200 bg-[var(--brand-lime)] text-white md:h-screen md:w-64 md:flex-shrink-0 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 px-6 pt-6">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--brand-gold)] font-bold text-[var(--brand-lime)]">
          A★
        </span>
        <span className="text-sm font-semibold">
          A<span className="text-[var(--brand-gold)]">★</span> Admin
        </span>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="touch-target rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-6 pb-6 text-xs text-white/60">
        {adminEmail && (
          <p className="truncate">
            Signed in as{" "}
            <span className="text-[var(--brand-gold)]">{adminEmail}</span>
          </p>
        )}
        <form action="/auth/logout" method="post" className="mt-3">
          <button
            type="submit"
            className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[var(--brand-gold)]"
          >
            Sign out →
          </button>
        </form>
      </div>
    </aside>
  );
}
