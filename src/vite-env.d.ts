/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_URL_API: string
    readonly VITE_USER_ID_MOCK: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
