import { desenvolvimentoPage } from "@/content/service-pages";
import { ServiceLandingPage, servicePageMetadata } from "@/components/layout/ServiceLandingPage";

export const metadata = servicePageMetadata(desenvolvimentoPage);

export default function DesenvolvimentoDeSoftwarePage() {
  return <ServiceLandingPage page={desenvolvimentoPage} />;
}
