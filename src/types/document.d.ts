import { EnvNameEnum } from '@tnitsiri-me/common';

declare global {
  export namespace NodeJS {
    /**
     * ANCHOR Process Env
     * @date 07/05/2025 - 17:48:31
     *
     * @export
     * @interface ProcessEnv
     * @typedef {ProcessEnv}
     */
    export interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production';
      ENV_NAME: EnvNameEnum;

      NEXT_PUBLIC_ENV_NAME: EnvNameEnum;

      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_APP_API_URL: string;

      NEXT_PUBLIC_AUTH_ACCESS_TOKEN_COOKIE_NAME: string;
    }
  }
}

export default global;
