
import { MainLayout } from "@/components/layout/MainLayout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { Tribes } from "@/components/home/Tribes";
import { RealDevsRealTalk } from "@/components/home/RealDevsRealTalk";
import { Timeline } from "@/components/home/Timeline";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <ProjectShowcase />
      <Tribes />
      <RealDevsRealTalk />
      <Timeline />
      <CTA />
    </MainLayout>
  );
};

export default Index;
