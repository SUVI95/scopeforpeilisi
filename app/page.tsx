import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import DashboardPreview from "@/components/sections/DashboardPreview";
import WorkflowPipeline from "@/components/sections/WorkflowPipeline";
import CustomerCrm from "@/components/sections/CustomerCrm";
import CalendarSpotlight from "@/components/sections/CalendarSpotlight";
import EventLifecycle from "@/components/sections/EventLifecycle";
import MirrorInventory from "@/components/sections/MirrorInventory";
import QuotesContracts from "@/components/sections/QuotesContracts";
import AutomationsSpotlight from "@/components/sections/AutomationsSpotlight";
import ContactFormSpotlight from "@/components/sections/ContactFormSpotlight";
import Features from "@/components/sections/Features";
import OutOfScope from "@/components/sections/OutOfScope";
import Security from "@/components/sections/Security";
import Delivery from "@/components/sections/Delivery";
import DiscoveryForm from "@/components/sections/DiscoveryForm";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <DashboardPreview />
      <WorkflowPipeline />
      <CustomerCrm />
      <CalendarSpotlight />
      <EventLifecycle />
      <MirrorInventory />
      <QuotesContracts />
      <AutomationsSpotlight />
      <ContactFormSpotlight />
      <Features />
      <OutOfScope />
      <Security />
      <Delivery />
      <DiscoveryForm />
      <Footer />
    </main>
  );
}
