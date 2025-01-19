import { Sidebar } from "@/features/work/human-evaluations/components/evaluation-details/sidebar";
import { Suspense } from "react";

export default function HumanEvaluationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex gap-5 h-full">
      <Suspense fallback={"aa"}>
        <Sidebar />
      </Suspense>
      {children}
    </section>
  );
}
