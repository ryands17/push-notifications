/// <reference types="react-scripts" />

declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    REACT_APP_API_KEY: boolean
    REACT_APP_AUTH_DOMAIN: boolean
    REACT_APP_DB_URL: boolean
    REACT_APP_PROJECT_ID: boolean
    REACT_APP_MESSAGING_ID: boolean
    REACT_APP_APP_ID: boolean
  }
}
