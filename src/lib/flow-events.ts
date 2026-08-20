/**
 * Open-flow event contract.
 *
 * The landing is static HTML (zero JS) except for ONE React island:
 * `src/islands/FlowIsland.tsx`, which owns the 7-step intake modal.
 *
 * Static sections never import React. To open the modal they rely on a DOM
 * CustomEvent dispatched on `window`:
 *
 *   1. Any static CTA is marked with `data-open-flow` (optionally with a value
 *      describing the origin, e.g. `<button data-open-flow="hero">`).
 *   2. A tiny script in `src/layouts/BaseLayout.astro` delegates clicks on
 *      `[data-open-flow]` and calls `dispatchOpenFlow({ source })`.
 *   3. `FlowIsland` listens for `OPEN_FLOW_EVENT` on `window` and opens the modal.
 *
 * Programmatic callers (e.g. a URL hash handler) can also call `dispatchOpenFlow()`.
 */

export const OPEN_FLOW_EVENT = 'defensa:open-flow' as const;

/** HTML attribute that marks a static element as a flow trigger. */
export const OPEN_FLOW_ATTRIBUTE = 'data-open-flow' as const;

export interface OpenFlowDetail {
  /** Free-form origin tag (value of the `data-open-flow` attribute), for analytics. */
  source?: string;
}

export type OpenFlowEvent = CustomEvent<OpenFlowDetail>;

declare global {
  interface WindowEventMap {
    [OPEN_FLOW_EVENT]: OpenFlowEvent;
  }
}

/** Dispatches the open-flow event on `window`. No-op during SSR. */
export function dispatchOpenFlow(detail: OpenFlowDetail = {}): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<OpenFlowDetail>(OPEN_FLOW_EVENT, { detail }));
}
