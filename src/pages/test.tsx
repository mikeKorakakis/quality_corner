import Page from "../core/components/Layout/Page";
import Test from '../features/Test2';
import { notify } from "../utils/notify";
import { useEffect } from 'react';

export default function TestPage() {
  return (
    <Page navbar={false} title="Test" auth={false}>
      <Test />
    </Page>
  );
}
