import Header from "@/shared/components/Header";
import Hero from "@/shared/components/Hero";

type Props = {
  children: React.ReactNode;
};

export default function publicLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-12">
      {children}
      </main>
    </>
  );
}
