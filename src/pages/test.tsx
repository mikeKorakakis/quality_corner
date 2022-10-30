import Page from "../core/components/Layout/Page";
import Test from '../features/Test';

export default function TestPage() {
  return (
    <Page navbar={false} title="Test" auth={false}>
      <Test />
    </Page>
  );
}
