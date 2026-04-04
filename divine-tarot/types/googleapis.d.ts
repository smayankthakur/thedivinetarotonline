declare module 'googleapis' {
  export function google(options?: { version: string; auth?: any }): {
    calendar: any;
    auth: {
      GoogleAuth: any;
    };
  };
}