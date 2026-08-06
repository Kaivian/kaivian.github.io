"use client";

import { useState, FormEvent } from "react";
import { Mail, FileText, Loader2, Check } from "lucide-react";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    story: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "c93c7055-9a48-4128-a02c-8696a26d7642";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Letter from ${formData.name}`,
          message: formData.story,
          from_name: "Kaivian Portfolio",
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", story: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        triggerMailto();
      }
    } catch {
      triggerMailto();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailto = () => {
    const mailtoSubject = encodeURIComponent(formData.subject || "Inquiry from Portfolio");
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.story}`
    );
    window.location.href = `mailto:theluc.1746@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", story: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-caslon-text py-16 scroll-mt-16">
      <div className="max-w-275 mx-auto px-4 md:px-0">
        {/* Top Meta Bar */}
        <div className="flex justify-between items-center text-[10px] md:text-[11px] text-[#45413A] font-mono font-bold tracking-[1.8px] pb-3 uppercase whitespace-nowrap">
          <div>SUBMIT A TIP</div>
          <div>THE DESK IS OPEN FOR SELECT WORK — 2026</div>
        </div>

        {/* Main Section Header */}
        <h2 className="font-(family-name:--font-libre-caslon-display) text-[32px] md:text-[46px] font-normal text-[#16140F] leading-none tracking-[-0.02em] mb-4">
          Letters &amp; Commissions
        </h2>

        {/* Solid Heavy Divider */}
        <div className="w-full border-b-[2.5px] border-[#1A1A1A] mb-8" />

        {/* Main 2-Column Contact Container */}
        <div className="border-2 border-[#1A1A1A] bg-[#F4F1EA] grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#1A1A1A]">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-(family-name:--font-libre-caslon-display) text-[26px] sm:text-[30px] font-normal text-[#16140F] leading-tight mb-2">
                Put it in writing
              </h3>
              <p className="font-libre-caslon-text text-[14px] sm:text-[15px] text-[#45413A] leading-relaxed mb-6">
                A project in mind, a role to fill, or just a good question - send it through and he&apos;ll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.2px] text-[#1A1A1A] uppercase mb-1.5">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full border-2 border-[#1A1A1A] bg-[#FBF9F5] px-3.5 py-2.5 text-[14px] sm:text-[15px] font-libre-caslon-text text-[#1A1A1A] placeholder:font-libre-caslon-text placeholder:text-[#8E887D] focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.2px] text-[#1A1A1A] uppercase mb-1.5">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full border-2 border-[#1A1A1A] bg-[#FBF9F5] px-3.5 py-2.5 text-[14px] sm:text-[15px] font-libre-caslon-text text-[#1A1A1A] placeholder:font-libre-caslon-text placeholder:text-[#8E887D] focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.2px] text-[#1A1A1A] uppercase mb-1.5">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="A new product, a rebuild, a contract..."
                    className="w-full border-2 border-[#1A1A1A] bg-[#FBF9F5] px-3.5 py-2.5 text-[14px] sm:text-[15px] font-libre-caslon-text text-[#1A1A1A] placeholder:font-libre-caslon-text placeholder:text-[#8E887D] focus:outline-none focus:bg-white transition-colors"
                  />
                </div>

                {/* The Story */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.2px] text-[#1A1A1A] uppercase mb-1.5">
                    THE STORY
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    placeholder="Tell him what you're building."
                    className="w-full border-2 border-[#1A1A1A] bg-[#FBF9F5] px-3.5 py-2.5 text-[14px] sm:text-[15px] font-libre-caslon-text text-[#1A1A1A] placeholder:font-libre-caslon-text placeholder:text-[#8E887D] focus:outline-none focus:bg-white transition-colors resize-y min-h-27.5"
                  />
                </div>

                {/* Bottom Row: Replied text & Send Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.2px] text-[#767269] uppercase">
                    USUALLY REPLIES WITHIN 24 HOURS
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1A1A1A] hover:bg-[#F4F1EA] text-[#F4F1EA] hover:text-[#1A1A1A] border-[2.5px] border-[#1A1A1A] px-6 py-3 font-mono font-bold text-[12px] uppercase tracking-[1.4px] transition-colors cursor-pointer self-start sm:self-auto flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed min-w-42.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>LETTER SENT!</span>
                      </>
                    ) : (
                      "SEND THE LETTER"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Info */}
          <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#F4F1EA]">
            <div>
              {/* Direct Line */}
              <div className="pb-6 border-b border-[#D8D4CA]">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.5px] text-[#555148] uppercase mb-1.5">
                  DIRECT LINE
                </div>
                <div>
                  <a
                    href="mailto:theluc.1746@gmail.com"
                    className="relative group inline-block font-libre-caslon-text text-[18px] sm:text-[20px] text-[#1A1A1A] hover:text-[#B93829] transition-colors py-0.5"
                  >
                    <span>theluc.1746@gmail.com</span>
                    <svg
                      className="absolute -bottom-0.5 left-0 w-full h-1.5 text-[#B93829] pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                      viewBox="0 0 160 8"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M1 5C30 2 60 7 90 4C120 1 140 6 159 3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>

                  <div className="mt-1">
                    <a
                      href="tel:+84969442579"
                      className="relative group inline-block font-libre-caslon-text text-[14px] sm:text-[15px] text-[#45413A] hover:text-[#B93829] transition-colors py-0.5 whitespace-nowrap"
                    >
                      <span>+84 969 442 579</span>
                      <svg
                        className="absolute -bottom-0.5 left-0 w-full h-1.5 text-[#B93829] pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                        viewBox="0 0 160 8"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M1 5C30 2 60 7 90 4C120 1 140 6 159 3"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="font-libre-caslon-text text-[13px] sm:text-[14px] text-[#555148] leading-relaxed mt-1.5">
                  For commissions, contracts, and software engineering opportunities.
                </p>
              </div>

              {/* The Desk */}
              <div className="py-6 border-b border-[#D8D4CA]">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.5px] text-[#555148] uppercase mb-1.5">
                  THE DESK
                </div>
                <div className="font-libre-caslon-text text-[18px] sm:text-[20px] text-[#1A1A1A] font-normal">
                  Đà Nẵng, Việt Nam
                </div>
                <p className="font-libre-caslon-text text-[13px] sm:text-[14px] text-[#555148] leading-relaxed mt-1">
                  GMT+7 - working with teams worldwide, remote-first.
                </p>
              </div>

              {/* Availability */}
              <div className="py-6 border-b border-[#D8D4CA]">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.5px] text-[#555148] uppercase mb-1.5">
                  AVAILABILITY
                </div>
                <div className="font-libre-caslon-text text-[18px] sm:text-[20px] text-[#1A1A1A] font-normal">
                  Freelance, Contract &amp; Full-Time
                </div>
                <p className="font-libre-caslon-text text-[13px] sm:text-[14px] text-[#555148] leading-relaxed mt-1">
                  Full-Stack &amp; AI Integration Engineer open for freelance, contract, or full-time roles.
                </p>
              </div>
            </div>

            {/* Social / Action Icons */}
            <div className="pt-6 flex items-center gap-3">
              {/* CV */}
              <div className="relative group/tooltip inline-block">
                <a
                  href="https://drive.google.com/file/d/1AFQvKxF2payGiwMqwEZyBkxMyKS5Z3MS/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Curriculum Vitae"
                  className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                >
                  <FileText className="w-5 h-5" />
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                  <div className="bg-[#16140F] text-[#F4F1EA] border border-[#33302B] px-2.5 py-1 text-[10px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                    Curriculum Vitae
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#16140F] mx-auto -mt-px" />
                </div>
              </div>

              {/* CVerify */}
              <div className="relative group/tooltip inline-block">
                <a
                  href="https://cverify.io.vn/kaivian"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CVerify"
                  className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] group transition-colors cursor-pointer"
                >
                  <img
                    src="/generals/CVerify Black Logo.png"
                    alt="CVerify"
                    className="w-5 h-5 object-contain group-hover:invert transition-all"
                  />
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                  <div className="bg-[#16140F] text-[#F4F1EA] border border-[#33302B] px-2.5 py-1 text-[10px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                    CVerify Profile
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#16140F] mx-auto -mt-px" />
                </div>
              </div>

              {/* GitHub */}
              <div className="relative group/tooltip inline-block">
                <a
                  href="https://github.com/Kaivian"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                  <div className="bg-[#16140F] text-[#F4F1EA] border border-[#33302B] px-2.5 py-1 text-[10px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                    GitHub Profile
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#16140F] mx-auto -mt-px" />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="relative group/tooltip inline-block">
                <a
                  href="https://linkedin.com/in/kaivian"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                  <div className="bg-[#16140F] text-[#F4F1EA] border border-[#33302B] px-2.5 py-1 text-[10px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                    LinkedIn Profile
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#16140F] mx-auto -mt-px" />
                </div>
              </div>

              {/* Mail */}
              <div className="relative group/tooltip inline-block">
                <a
                  href="mailto:theluc.1746@gmail.com"
                  aria-label="Email"
                  className="w-10 h-10 border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                  <div className="bg-[#16140F] text-[#F4F1EA] border border-[#33302B] px-2.5 py-1 text-[10px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                    Send Email
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#16140F] mx-auto -mt-px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



