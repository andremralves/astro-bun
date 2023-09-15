export interface Options {
  port?: number;
  hostname?: string;
}

export interface BuildConfig {
  server: URL;
  serverEntry: string;
  assets: string;
}
