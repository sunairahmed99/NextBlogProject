declare namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      SECRETKEY:string;
      EMAIL_HOST:string,
      EMAIL_PORT:string,
      EMAIL_USER:string,
      EMAIL_PASS:string
    }
  }