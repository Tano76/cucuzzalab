import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SimulatorShowcase } from "@/components/site/SimulatorShowcase";
import { PilotSection } from "@/components/site/PilotSection";
import { FAQ } from "@/components/site/FAQ";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "cucuzzalab",
            description:
              "Browser-based 3D training simulators for construction, surveying and civil engineering education. Help students practice real-world procedures before the physical lab.",
            url: "https://cucuzzalab.example",
            audience: [
              "Community Colleges",
              "Technical Colleges",
              "TAFE institutions",
              "Universities",
              "Workforce development organizations",
              "Construction training providers",
              "Apprenticeship programs",
            ],
            knowsAbout: [
              "Construction Surveying",
              "Civil Engineering",
              "Construction Safety",
              "Site Layout",
              "Blueprint Reading",
              "Equipment Training",
              "Babylon.js",
              "WebGL",
              "Real-time 3D",
            ],
          }),
        }}
      />

      <Navbar />

      <main className="flex-1">
        <Hero />
        <SimulatorShowcase />
        <PilotSection />
        <FAQ />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
