/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NX_ACCESS_TOKEN: string;
  readonly NX_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
