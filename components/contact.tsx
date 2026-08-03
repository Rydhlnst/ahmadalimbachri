import { Mail, Phone, MapPin, ArrowUpRight, User } from "lucide-react";
import { FadeIn, FadeInBlur } from "@/components/ui/motion";
import { PhotoSkeleton } from "@/components/ui/photo-skeleton";
import { Section, SectionHeader } from "@/components/ui/section";
import { professor } from "@/lib/data";

const contactItems = [
  { icon: Mail,  label: "Email",   value: professor.email,   href: `mailto:${professor.email}` },
  { icon: Phone, label: "Telepon", value: professor.phone,   href: `tel:${professor.phone}` },
  { icon: MapPin, label: "Alamat", value: professor.address, href: undefined },
];

export function Contact() {
  return (
    <Section id="contact" bg="navy" ariaLabelledBy="contact-heading">
      <SectionHeader
        label="Kontak"
        titleId="contact-heading"
        title="Mari Terhubung."
        description="Untuk kolaborasi penelitian, undangan narasumber, atau pertanyaan akademik — silakan hubungi melalui saluran di bawah."
        tone="gold"
      />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Left — signature card */}
        <FadeIn direction="right">
          <div className="border border-white/15 bg-white/[0.02] p-5 grid grid-cols-[100px_1fr] gap-5 items-center mb-6">
            <div className="w-full">
              <PhotoSkeleton aspect="portrait" />
            </div>
            <div>
              <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold mb-2">
                <User className="h-3 w-3" strokeWidth={1.5} />
                Rektor ULM
              </p>
              <p className="font-heading text-base md:text-lg font-bold text-white mb-1 leading-tight">
                {professor.name}
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                {professor.titleEn}
              </p>
            </div>
          </div>

          <a
            href={`mailto:${professor.email}`}
            className="group inline-flex items-center gap-3 h-11 px-6 text-sm font-semibold bg-gold text-navy hover:bg-white transition-colors duration-300"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            <span>Kirim Email</span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={1.5} />
          </a>
        </FadeIn>

        {/* Right — contact list */}
        <FadeInBlur delay={0.15}>
          <div className="border border-white/15 bg-white/[0.02] divide-y divide-white/10">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="p-5 grid grid-cols-[28px_100px_1fr] gap-4 items-center">
                  <span className="text-[10px] font-mono text-white/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                    <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                    {item.label}
                  </div>
                  <div className="min-w-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-white hover:text-gold transition-colors duration-300 break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white/90 leading-snug">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInBlur>
      </div>
    </Section>
  );
}
