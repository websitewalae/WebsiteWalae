import PageTransition from "@/components/layout/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <main className="relative min-h-screen w-full overflow-x-hidden">
        {children}
      </main>
    </PageTransition>
  );
}
