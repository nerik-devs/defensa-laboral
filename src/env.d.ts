/// <reference types="astro/client" />

/**
 * Environment contract.
 *
 * Astro only exposes `PUBLIC_*` variables to client code, so the flow island
 * must read `PUBLIC_SINACOL_SERVER_URL`. `VITE_SINACOL_SERVER_URL` is kept
 * declared during the migration because src/components/flow/** (A3's scope)
 * still reads it; A3 renames the usage and A4 drops the VITE_ entry.
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
