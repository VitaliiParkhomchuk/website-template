import { defineConfig } from "vite";
import pug from "pug";
import fs from "fs";
import { resolve, basename } from "path";
import { glob } from "glob";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";

const entryPoints = glob.sync(["index.pug", "src/pages/**/*.pug"]).reduce((acc, path) => {
  const name = basename(path, ".pug");
  const key = `${name}.html`;
  acc[key] = resolve(__dirname, path);
  return acc;
}, {});

const virtualModuleMap = Object.keys(entryPoints).reduce((acc, key) => {
  acc[resolve(__dirname, key)] = entryPoints[key];
  return acc;
}, {});

export default defineConfig({
  plugins: [
    iconsSpritesheet({
      inputDir: "./src/shared/icons",
      outputDir: "./public",
      fileName: "icons.svg",
    }),
    {
      name: "vite-plugin-pug-resolver",
      resolveId(id, importer) {
        if (!importer && entryPoints[id]) {
          return resolve(__dirname, id);
        }
      },

      load(id) {
        if (virtualModuleMap[id]) {
          const pugPath = virtualModuleMap[id];
          return pug.renderFile(pugPath, {
            basedir: resolve(__dirname, "src"),
            pretty: true,
          });
        }
      },

      configureServer(server) {
        server.watcher.on("change", (file) => {
          if (file.endsWith(".pug") || file.endsWith("scss")) {
            server.ws.send({ type: "full-reload", path: "*" });
          }
        });
        server.middlewares.use(async (req, res, next) => {
          try {
            const url = req.url.split("?")[0].split("#")[0];
            const candidates = [];
            if (url === "/" || url === "/index.html") {
              candidates.push(resolve(__dirname, "index.pug"));
            } else {
              const raw = url.replace(/^\//, "").replace(/\.html$/, "");
              candidates.push(resolve(__dirname, raw + ".pug"));
              candidates.push(resolve(__dirname, "src", raw + ".pug"));
              candidates.push(resolve(__dirname, "src/pages", raw, raw + ".pug"));
              candidates.push(resolve(__dirname, "src/pages", raw + ".pug"));
            }
            for (const filePath of candidates) {
              if (filePath && fs.existsSync(filePath)) {
                const html = pug.renderFile(filePath, {
                  basedir: resolve(__dirname, "src"),
                });
                const processedHtml = await server.transformIndexHtml(req.url, html);
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.end(processedHtml, "utf8");
                return;
              }
            }
          } catch (err) {
            return next(err);
          }
          next();
        });
      },
    },
  ],
  root: ".",
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: Object.keys(entryPoints),
      output: {
        entryFileNames: `assets/scripts/[name].js`,
        chunkFileNames: `assets/scripts/[name].js`,
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".").at(-1);
          if (/css/i.test(extType)) {
            return `assets/styles/[name][extname]`;
          }
          if (/mp4|webm|ogg|mov|avi|wmv/i.test(extType)) {
            return `assets/videos/[name][extname]`;
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@app": resolve(__dirname, "src/app"),
      "@pages": resolve(__dirname, "src/pages"),
      "@widgets": resolve(__dirname, "src/widgets"),
      "@features": resolve(__dirname, "src/features"),
      "@shared": resolve(__dirname, "src/shared"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@app/styles/vars.scss" as *;
        @use "@app/styles/mixins.scss" as *;`,
      },
    },
  },
});
