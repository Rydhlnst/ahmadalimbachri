import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Stats } from "@/components/stats";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Publications } from "@/components/publications";
import { Awards } from "@/components/awards";
import { Organizations } from "@/components/organizations";
import { ExpertContributions } from "@/components/expert-contributions";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Stats />
        <Education />
        <Experience />
        <Publications />
        <Awards />
        <Organizations />
        <ExpertContributions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
