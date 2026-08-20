/// <reference types="astro/client" />

/**
 * Environment contract.
 *
 * Astro only exposes `PUBLIC_*` variables to client code, so the flow island
 * reads `PUBLIC_SINACOL_SERVER_URL` (src/components/flow/steps/ResultStep.tsx).
 * `VITE_SINACOL_SERVER_URL` is no longer read anywhere; its declaration is kept
 * only as a transitional alias and A4 drops it.
 */
interface ImportMetaEnv {
  /** SINACOL automation server base URL (production). Required in prod builds. */
  readonly PUBLIC_SINACOL_SERVER_URL?: string;
  /** @deprecated Transitional alias of PUBLIC_SINACOL_SERVER_URL (Vite SPA era). */
  readonly VITE_SINACOL_SERVER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
