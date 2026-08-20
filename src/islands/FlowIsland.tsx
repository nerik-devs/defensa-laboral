/**
 * FlowIsland — the ONLY React island on the landing (mounted with `client:idle`
 * from `src/pages/index.astro`).
 *
 * OWNER: A3. This file is a stub created by A1 so the page builds; A3 replaces
 * the body with `LaboralFlowModal` + steps (src/components/flow/**) and wires
 * `PUBLIC_SINACOL_SERVER_URL`.
 *
 * Contract (see src/lib/flow-events.ts):
 *   - Static CTAs carry `data-open-flow`; BaseLayout dispatches the
 *     `defensa:open-flow` CustomEvent on `window`.
 *   - This island listens for that event and opens the modal.
 */
import { useEffect, useState } from 'react';
import { OPEN_FLOW_EVENT, type OpenFlowEvent } from '../lib/flow-events';

export default function FlowIsland() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onOpen = (event: OpenFlowEvent) => {
      if (import.meta.env.DEV) {
        console.debug('[FlowIsland] open-flow received', event.detail);
      }
      setIsOpen(true);
    };
    window.addEventListener(OPEN_FLOW_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_FLOW_EVENT, onOpen);
  }, []);

  // TODO(A3): render <LaboralFlowModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  void isOpen;
  return null;
}
