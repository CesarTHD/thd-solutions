import { integracaoPage } from "@/content/service-pages";
import { ServiceLandingPage, servicePageMetadata } from "@/components/layout/ServiceLandingPage";

export const metadata = servicePageMetadata(integracaoPage);

export default function IntegracaoDeSistemasPage() {
  return <ServiceLandingPage page={integracaoPage} />;
}
