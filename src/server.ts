import type { SSRManifest } from "astro";
import { App } from "astro/app";
import type { Options } from "./types";
import type { Server } from "bun";

let _server: Server | undefined = undefined;

export function start(manifest: SSRManifest, options: Options) {
  const clientRoot = new URL("../client/", import.meta.url);
  const app = new App(manifest);
  const logger = app.getAdapterLogger();
  _server = Bun.serve({
    port: options.port,
    hostname: options.hostname,
    async fetch(req) {
      if (app.match(req)) {
        const res = await app.render(req);
        return res;
      }

      const url = new URL(req.url);
      const localPath = new URL(
        "./" + app.removeBase(url.pathname) + "/index.html",
        clientRoot,
      );

      const file = Bun.file(localPath);
      if (await file.exists()) {
        let fileResp = new Response(Bun.file(localPath));
        return fileResp;
      }

      const res = await app.render(req);
      return res;
    },
    error(error) {
      return new Response(`<pre>${error}\n${error.stack}</pre>`, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    },
  });

  logger.info(`Bun server listening on port ${_server.port}`);
}

export function createExports(manifest: SSRManifest, options: Options) {
  const app = new App(manifest);
  return {
    stop() {
      if (_server) {
        _server.stop();
        _server = undefined;
      }
    },
    running() {
      return _server !== undefined;
    },
    async start() {
      return start(manifest, options);
    },
    async handle(request: Request) {
      return app.render(request);
    },
  };
}
