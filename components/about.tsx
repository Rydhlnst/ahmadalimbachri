import { FadeIn, FadeInBlur } from "@/components/ui/motion";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section, SectionHeader, DataRow } from "@/components/ui/section";
import { MapPin, Calendar, BookOpen, GraduationCap, Building2 } from "lucide-react";
import { professor } from "@/lib/data";

export function About() {
  return (
    <Section id="about" bg="white" ariaLabelledBy="about-heading">
      <SectionHeader
        label="Tentang"
        titleId="about-heading"
        title="Tiga dekade dedikasi untuk riset, kepemimpinan, dan pendidikan tinggi."
        description="Perjalanan akademis Prof. Dr. Ahmad merentang dari industri, riset, hingga kepemimpinan institusi pendidikan tinggi di Kalimantan Selatan."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">

        {/* Portrait — contained */}
        <FadeIn direction="right" className="lg:sticky lg:top-24">
          <div className="max-w-sm mx-auto lg:mx-0">
            <ImagePlaceholder variant="gradient" aspect="portrait-tall" index={1} label="Portrait" />
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <span>Prof. Dr. Ahmad</span>
              <span>Rektor · 2026</span>
            </div>
          </div>
        </FadeIn>

        {/* Content */}
        <FadeInBlur delay={0.12}>
          <div className="space-y-5 mb-10">
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed text-justify font-light">
              {professor.bio}
            </p>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed text-justify">
              Lahir di {professor.birthplace} pada {professor.birthdate}, beliau
              menempuh pendidikan hingga jenjang doktoral di Universitas Hasanuddin,
              Makassar. Perjalanan akademiknya dimulai sebagai dosen di Universitas
              Lambung Mangkurat sejak tahun 1995, dan kini beliau memimpin institusi
              tersebut sebagai Rektor.
            </p>
          </div>

          {/* Icon facts rows */}
          <div className="border-t border-neutral-200">
            <DataRow icon={MapPin} label="Tempat Lahir" value="Enrekang, Sulawesi Selatan" />
            <DataRow icon={Calendar} label="Kelahiran" value={professor.birthdate} />
            <DataRow icon={GraduationCap} label="Mulai Mengajar" value="1995" />
            <DataRow icon={Building2} label="Institusi" value={professor.university} />
            <DataRow icon={BookOpen} label="Bidang" value="Manajemen & Ekonomi" />
          </div>
        </FadeInBlur>
      </div>
    </Section>
  );
}
