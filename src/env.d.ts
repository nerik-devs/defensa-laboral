/// <reference types="astro/client" />

/**
 * Environment contract.
 *
 * Astro only exposes `PUBLIC_*` variables to client code, so the flow island
 * reads `PUBLIC_SINACOL_SERVER_URL` (src/components/flow/steps/ResultStep.tsx).
 * The Vite-era `VITE_SINACOL_SERVER_URL` is gone: nothing reads it any more.
 */
interface ImportMetaEnv {
  /** SINACOL automation server base URL (production). Required in prod builds. */
  readonly PUBLIC_SINACOL_SERVER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
