import Header from "@/components/Header";
import FrontPageSection from "@/components/FrontPageSection";
import SelectedWorksSection from "@/components/SelectedWorksSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A1A1A]">
      <Header />
      <FrontPageSection />
      <SelectedWorksSection />

      {/* Main Content Area */}
      <main className="max-w-275 mx-auto px-4 md:px-0 py-12">
        <section id="stack" className="scroll-mt-16 py-12 border-b border-[#1A1A1A]/30">
          <h2 className="font-(family-name:--font-libre-caslon-display) text-4xl mb-4 text-[#16140F]">
            Tech Stack
          </h2>
          <p className="font-libre-franklin text-[#45413A] max-w-2xl leading-relaxed">
            Specializing in modern web development including Next.js, React, TypeScript, Java, and Tailwind CSS.
          </p>
        </section>

        <section id="contact" className="scroll-mt-16 py-12">
          <h2 className="font-(family-name:--font-libre-caslon-display) text-4xl mb-4 text-[#16140F]">
            Contact
          </h2>
          <p className="font-libre-franklin text-[#45413A] max-w-2xl leading-relaxed">
            Get in touch for freelance projects, collaborations, or full-time opportunities.
          </p>
        </section>
      </main>
    </div>
  );
}
