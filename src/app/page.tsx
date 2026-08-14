import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import FrontPageSection from "@/components/FrontPageSection";
import SelectedWorksSection from "@/components/SelectedWorksSection";
import LabReportSection from "@/components/LabReportSection";
import CareerLedgerSection from "@/components/CareerLedgerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A1A1A]">
      <Preloader />
      <Header />
      <FrontPageSection />
      <SelectedWorksSection />
      <LabReportSection />
      <CareerLedgerSection />
      <ContactSection />
      <Footer />
    </div>
  );
}


