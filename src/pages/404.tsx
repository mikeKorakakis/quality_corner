import Page from "@/core/components/Layout/Page";
import NotFound from "@/features/NotFound";

export default function NotFoundPage() {
  return (
    <Page navbar={false} title="Not Found">
      <NotFound />
    </Page>
  );
}
