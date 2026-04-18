/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CATALOG_API?: string;
  readonly VITE_INVENTORY_API?: string;
  readonly VITE_ORDERS_API?: string;
  readonly VITE_CARE_REMINDERS_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
