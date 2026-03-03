export default function MarkdownProse({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="glass-prose">{children}</div>;
}
