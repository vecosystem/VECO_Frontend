/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SERVER_API_URL: string;
  readonly VITE_SLACK_CLIENT_ID: string;
  readonly VITE_SLACK_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
