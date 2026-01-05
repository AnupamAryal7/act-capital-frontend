// app/faqs/layout.tsx
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
