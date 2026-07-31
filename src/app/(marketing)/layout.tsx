import Navigation from "@/components/marketing/navigation";
import Footer from "@/components/marketing/footer";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/loading-screen";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
