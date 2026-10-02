import Hero from "@/components/home/Hero";
import MarqueeBand from "@/components/home/MarqueeBand";
import CampaignSlider from "@/components/home/CampaignSlider";
import CategoryBento from "@/components/home/CategoryBento";
import DealsSection from "@/components/home/DealsSection";
import KeraSpotlight from "@/components/home/KeraSpotlight";
import RazorlineShowcase from "@/components/home/RazorlineShowcase";
import WaxPicker from "@/components/home/WaxPicker";
import Bestsellers from "@/components/home/Bestsellers";
import BrandList from "@/components/home/BrandList";
import Lookbook from "@/components/home/Lookbook";
import WhyUs from "@/components/home/WhyUs";
import FaqPreview from "@/components/home/FaqPreview";
import CtaBand from "@/components/home/CtaBand";
import { bestsellers } from "@/lib/data";
import { buildMeta } from "@/lib/i18n/meta";
import type { Lang } from "@/lib/i18n/config";

export const homeMeta = (lang: Lang) => buildMeta(lang, { path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <CampaignSlider />
      <CategoryBento />
      <DealsSection />
      <KeraSpotlight />
      <RazorlineShowcase />
      <WaxPicker />
      <Bestsellers products={bestsellers()} />
      <BrandList />
      <Lookbook />
      <WhyUs />
      <FaqPreview />
      <CtaBand />
    </>
  );
}
