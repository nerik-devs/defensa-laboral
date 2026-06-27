/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL del servidor de automatización SINACOL (producción). En dev se omite y se usa el túnel/localhost. */
  readonly VITE_SINACOL_SERVER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
