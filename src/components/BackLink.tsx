import Link from "next/link";

export default function BackLink({ href }: { href: string }) {
  const isHome = href === "/";
  return (
    <Link
      href={href}
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white/80 sm:left-6 sm:top-6"
    >
      <span aria-hidden="true">&larr;</span>
      {isHome ? "Home" : "Back"}
    </Link>
  );
}
