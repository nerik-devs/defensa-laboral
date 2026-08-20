/**
 * FlowIsland — the ONLY React island on the landing (mounted with `client:idle`
 * from `src/pages/index.astro`).
 *
 * Wraps `LaboralFlowModal` (the hardened 7-step intake flow) and owns the
 * open/closed state. Static sections never import React; they open the modal
 * through the DOM event contract in `src/lib/flow-events.ts`:
 *   - Static CTAs carry `data-open-flow`; BaseLayout dispatches the
 *     `defensa:open-flow` CustomEvent on `window`.
 *   - This island listens for that event on mount, opens the modal, and removes
 *     the listener on unmount.
 */
import { useEffect, useState } from 'react';
import LaboralFlowModal from '../components/flow/LaboralFlowModal';
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

  return <LaboralFlowModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
